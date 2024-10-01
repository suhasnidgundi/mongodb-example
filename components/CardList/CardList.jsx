"use client"

import { useState } from 'react';
import Link from 'next/link';
import "./CardList.module.css";

const CardList = ({ items, renderItem, keyExtractor, linkPath, onUpdate, onDelete }) => {
    const [editingId, setEditingId] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const [error, setError] = useState(null);

    // Fields that should not be editable
    const nonEditableFields = ['_id', 'id', 'createdAt', 'updatedAt'];

    const handleEdit = (item) => {
        setEditingId(keyExtractor(item));
        setEditedItem(item);
        setError(null);
    };

    const handleSave = async (item) => {
        try {
            const id = keyExtractor(item);
            if (!id) {
                throw new Error('Item ID is undefined');
            }

            // Remove non-editable fields from the data being sent
            const dataToUpdate = Object.fromEntries(
                Object.entries(editedItem).filter(([key]) => !nonEditableFields.includes(key))
            );

            const response = await fetch(`/api/form?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToUpdate),
            });

            if (response.ok) {
                setEditingId(null);
                onUpdate(); // Refresh the list after update
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update item');
            }
        } catch (error) {
            console.error('Error updating item:', error);
            setError(`Error updating item: ${error.message}`);
        }
    };

    const handleDelete = async (item) => {
        try {
            const id = keyExtractor(item);
            if (!id) {
                throw new Error('Item ID is undefined');
            }

            if (window.confirm('Are you sure you want to delete this item?')) {
                const response = await fetch(`/api/form?id=${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    onDelete(); // Refresh the list after delete
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to delete item');
                }
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            setError(`Error deleting item: ${error.message}`);
        }
    };

    const handleInputChange = (e, field) => {
        setEditedItem({ ...editedItem, [field]: e.target.value });
    };

    return (
        <div className="accordion" id="formAccordion">
            {error && <div className="alert alert-danger">{error}</div>}
            {items?.map((item, index) => (
                <div className="accordion-item" key={keyExtractor(item)}>
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded="false"
                            aria-controls={`collapse${index}`}
                        >
                            {item.firstName} {item.lastName}
                        </button>
                    </h2>
                    <div
                        id={`collapse${index}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#formAccordion"
                    >
                        <div className="accordion-body">
                            {editingId === keyExtractor(item) ? (
                                <>
                                    {Object.entries(item).map(([key, value]) => (
                                        <div key={key} className="mb-3">
                                            <label className="form-label">{key}</label>
                                            {nonEditableFields.includes(key) ? (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={value || ''}
                                                    disabled
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={editedItem[key] || ''}
                                                    onChange={(e) => handleInputChange(e, key)}
                                                />
                                            )}
                                        </div>
                                    ))}
                                    <button className="btn btn-primary me-2" onClick={() => handleSave(item)}>Save</button>
                                    <button className="btn btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    {renderItem(item)}
                                    <button className="btn btn-primary me-2" onClick={() => handleEdit(item)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(item)}>Delete</button>
                                </>
                            )}
                            {linkPath && (
                                <Link href={`${linkPath}/${keyExtractor(item)}`} passHref>
                                    <p className="btn btn-info mt-2">View Details</p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardList;