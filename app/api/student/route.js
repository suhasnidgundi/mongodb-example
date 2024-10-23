// app/api/student/route.js
import { NextResponse } from "next/server";
import { Student } from "@/models/Student";
import connectDB from "@/libs/mongodb";

export async function POST(request) {
    try {
        await connectDB();

        const data = await request.json();

        // Validate required fields
        if (!data.email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Check if student already exists
        const existingStudent = await Student.findOne({ email: data.email });
        if (existingStudent) {
            return NextResponse.json(
                { error: "Student with this email already exists" },
                { status: 409 }
            );
        }

        // Create new student
        const student = await Student.create({
            ...data,
            profileCompleted: true
        });

        return NextResponse.json(
            { success: true, data: student },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in POST /api/student:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { error: "Email parameter is required" },
                { status: 400 }
            );
        }

        const student = await Student.findOne({ email });

        if (!student) {
            return NextResponse.json(
                { error: "Student not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: student },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in GET /api/student:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}