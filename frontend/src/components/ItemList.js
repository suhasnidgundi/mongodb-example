import React, { useState, useEffect } from 'react';
import { getItems, deleteItem, updateItem } from '../services/api';
import { Formik, Form, Field } from 'formik';
import { validationSchema } from './ItemForm';

const ItemList = ({ refreshTrigger }) => {
    const [items, setItems] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchItems();
    }, [refreshTrigger]);

    const fetchItems = async () => {
        try {
            const data = await getItems();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleDelete = async (id) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            await deleteItem(id);
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (id) => {
        if (isSubmitting) return;
        setEditingId(id);
    };

    const handleUpdate = async (values) => {
        setIsSubmitting(true);
        try {
            await updateItem(editingId, values);
            setEditingId(null);
            fetchItems();
        } catch (error) {
            console.error('Error updating item:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h2 className="card-title mb-4">Item List</h2>
                <ul className="list-group">
                    {items.map((item) => (
                        <li key={item._id} className="list-group-item">
                            {editingId === item._id ? (
                                <Formik
                                    initialValues={item}
                                    validationSchema={validationSchema}
                                    onSubmit={handleUpdate}
                                >
                                    {({ errors, touched, isSubmitting: formSubmitting }) => (
                                        <Form className="row g-3">
                                            <div className="col-md-6 form-floating">
                                                <Field
                                                    name="name"
                                                    type="text"
                                                    className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                                                    id="edit-name"
                                                    placeholder="Name"
                                                />
                                                <label htmlFor="edit-name">Name</label>
                                            </div>
                                            <div className="col-md-6 form-floating">
                                                <Field
                                                    name="category"
                                                    type="text"
                                                    className={`form-control ${errors.category && touched.category ? 'is-invalid' : ''}`}
                                                    id="edit-category"
                                                    placeholder="Category"
                                                />
                                                <label htmlFor="edit-category">Category</label>
                                            </div>
                                            <div className="col-md-4 form-floating">
                                                <Field
                                                    name="price"
                                                    type="number"
                                                    className={`form-control ${errors.price && touched.price ? 'is-invalid' : ''}`}
                                                    id="edit-price"
                                                    placeholder="Price"
                                                />
                                                <label htmlFor="edit-price">Price</label>
                                            </div>
                                            <div className="col-md-4 form-floating">
                                                <Field
                                                    name="quantity"
                                                    type="number"
                                                    className={`form-control ${errors.quantity && touched.quantity ? 'is-invalid' : ''}`}
                                                    id="edit-quantity"
                                                    placeholder="Quantity"
                                                />
                                                <label htmlFor="edit-quantity">Quantity</label>
                                            </div>
                                            <div className="col-md-4">
                                                <button type="submit" className="btn btn-success w-100" disabled={formSubmitting || isSubmitting}>
                                                    {formSubmitting ? 'Saving...' : 'Save'}
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            ) : (
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-1">{item.name}</h5>
                                        <p className="mb-1">Category: {item.category}</p>
                                        <small>Price: ${item.price} | Quantity: {item.quantity}</small>
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-outline-primary btn-sm me-2"
                                            onClick={() => handleEdit(item._id)}
                                            disabled={isSubmitting}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleDelete(item._id)}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ItemList;