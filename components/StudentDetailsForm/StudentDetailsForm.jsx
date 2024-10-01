"use client";
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const studentSchema = z.object({
  firstName: z.string().min(2, 'Too short').max(50, 'Too long'),
  lastName: z.string().min(2, 'Too short').max(50, 'Too long'),
  email: z.string().email('Invalid email'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD format'),
  gender: z.enum(['male', 'female', 'other']),
  course: z.string().min(1, 'Required'),
  address: z.string().min(5, 'Too short').max(200, 'Too long'),
});

const StudentDetailsForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    course: '',
    address: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setAlertMessage('Form submitted successfully!');
      setAlertType('success');
      setShowAlert(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlertMessage('Failed to submit form. Please try again.');
      setAlertType('danger');
      setShowAlert(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Student Details Form</h2>

      {showAlert && (
        <div className={`alert alert-${alertType}`} role="alert">
          {alertMessage}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(studentSchema)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="row g-3">
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <Field
                  type="text"
                  name="firstName"
                  className={`form-control ${errors.firstName && touched.firstName ? 'is-invalid' : ''}`}
                  id="firstName"
                  placeholder="First Name"
                />
                <label htmlFor="firstName">First Name</label>
                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating mb-3">
                <Field
                  type="text"
                  name="lastName"
                  className={`form-control ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`}
                  id="lastName"
                  placeholder="Last Name"
                />
                <label htmlFor="lastName">Last Name</label>
                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating mb-3">
                <Field
                  type="email"
                  name="email"
                  className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                  id="email"
                  placeholder="Email"
                />
                <label htmlFor="email">Email</label>
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating mb-3">
                <Field
                  type="date"
                  name="dateOfBirth"
                  className={`form-control ${errors.dateOfBirth && touched.dateOfBirth ? 'is-invalid' : ''}`}
                  id="dateOfBirth"
                  placeholder="Date of Birth"
                />
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <ErrorMessage name="dateOfBirth" component="div" className="invalid-feedback" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating mb-3">
                <Field
                  as="select"
                  name="gender"
                  className={`form-select ${errors.gender && touched.gender ? 'is-invalid' : ''}`}
                  id="gender"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <label htmlFor="gender">Gender</label>
                <ErrorMessage name="gender" component="div" className="invalid-feedback" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-floating mb-3">
                <Field
                  type="text"
                  name="course"
                  className={`form-control ${errors.course && touched.course ? 'is-invalid' : ''}`}
                  id="course"
                  placeholder="Course"
                />
                <label htmlFor="course">Course</label>
                <ErrorMessage name="course" component="div" className="invalid-feedback" />
              </div>
            </div>

            <div className="col-12">
              <div className="form-floating mb-3">
                <Field
                  as="textarea"
                  name="address"
                  className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`}
                  id="address"
                  placeholder="Address"
                  style={{ height: '100px' }}
                />
                <label htmlFor="address">Address</label>
                <ErrorMessage name="address" component="div" className="invalid-feedback" />
              </div>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StudentDetailsForm;
