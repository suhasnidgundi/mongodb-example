// components/StudentDetailsForm.jsx
"use client";
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const studentSchema = z.object({
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be in YYYY-MM-DD format'),
  gender: z.enum(['male', 'female', 'other']),
  course: z.string().min(1, 'Required'),
  address: z.string().min(5, 'Too short').max(200, 'Too long'),
  familyName: z.string().min(1, 'Required').max(100, 'Too long'),
});

const StudentDetailsForm = ({ kindeUserData, onSubmit }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const initialValues = {
    dateOfBirth: '',
    gender: '',
    course: '',
    address: '',
    familyName: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Create FormData object
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

      // Add hasSubmittedForm flag
      formData.append('hasSubmittedForm', 'true');

      await onSubmit(formData);

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

      {/* Display Kinde user data */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Your Information</h5>
          <div className="row">
            <div className="col-md-4">
              <p className="mb-1"><strong>First Name:</strong> {kindeUserData.firstName}</p>
            </div>
            <div className="col-md-4">
              <p className="mb-1"><strong>Last Name:</strong> {kindeUserData.lastName}</p>
            </div>
            <div className="col-md-4">
              <p className="mb-1"><strong>Email:</strong> {kindeUserData.email}</p>
            </div>
          </div>
        </div>
      </div>

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
                  name="familyName"
                  className={`form-control ${errors.familyName && touched.familyName ? 'is-invalid' : ''}`}
                  id="familyName"
                  placeholder="Family Name"
                />
                <label htmlFor="familyName">Family Name</label>
                <ErrorMessage name="familyName" component="div" className="invalid-feedback" />
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