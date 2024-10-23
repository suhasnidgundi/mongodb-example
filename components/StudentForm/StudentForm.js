"use client";
import { useState } from "react";

export default function StudentForm({ user, onComplete }) {
    const [formData, setFormData] = useState({
        firstName: user?.given_name || "",
        lastName: user?.family_name || "",
        email: user?.email || "",
        dateOfBirth: "",
        gender: "",
        course: "",
        address: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            onComplete();
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                {/* Add form fields using Bootstrap classes */}
            </form>
        </div>
    );
}