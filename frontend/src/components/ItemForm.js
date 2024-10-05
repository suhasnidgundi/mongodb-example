import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createItem } from '../services/api';

export const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    price: Yup.number().positive('Price must be positive').required('Price is required'),
    quantity: Yup.number().integer('Quantity must be an integer').min(0, 'Quantity must be non-negative').required('Quantity is required'),
});

const ItemForm = ({ onItemAdded }) => {
    const [error, setError] = useState(null);
    const [categories] = useState(['Electronics', 'Books', 'Clothing', 'Home & Garden', 'Sports', 'Toys']);

    const initialValues = {
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await createItem(values);
            resetForm();
            setError(null);
            onItemAdded();
        } catch (error) {
            console.error('Error creating item:', error);
            setError('Failed to create item. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h2 className="card-title mb-4">Add New Item</h2>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <div className="form-floating mb-3">
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                                    placeholder="Name"
                                />
                                <label htmlFor="name">Name</label>
                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-floating mb-3">
                                <Field
                                    as="textarea"
                                    id="description"
                                    name="description"
                                    className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''}`}
                                    placeholder="Description"
                                    style={{ height: '100px' }}
                                />
                                <label htmlFor="description">Description</label>
                                <ErrorMessage name="description" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-floating mb-3">
                                <Field
                                    type="text"
                                    id="category"
                                    name="category"
                                    list="categories"
                                    className={`form-control ${errors.category && touched.category ? 'is-invalid' : ''}`}
                                    placeholder="Category"
                                />
                                <label htmlFor="category">Category</label>
                                <datalist id="categories">
                                    {categories.map((category, index) => (
                                        <option key={index} value={category} />
                                    ))}
                                </datalist>
                                <ErrorMessage name="category" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-floating mb-3">
                                <Field
                                    type="number"
                                    id="price"
                                    name="price"
                                    className={`form-control ${errors.price && touched.price ? 'is-invalid' : ''}`}
                                    placeholder="Price"
                                />
                                <label htmlFor="price">Price</label>
                                <ErrorMessage name="price" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-floating mb-3">
                                <Field
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    className={`form-control ${errors.quantity && touched.quantity ? 'is-invalid' : ''}`}
                                    placeholder="Quantity"
                                />
                                <label htmlFor="quantity">Quantity</label>
                                <ErrorMessage name="quantity" component="div" className="invalid-feedback" />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Add Item'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ItemForm;