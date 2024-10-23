// app/api/form/route.js
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import { Student } from "@/models/Student";

export async function POST(request) {
    try {
        // Get the authenticated user
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user || !user.id) {
            return NextResponse.json(
                { error: "Unauthorized access" },
                { status: 401 }
            );
        }

        // Connect to MongoDB
        await connectDB();

        // Parse the request body
        const data = await request.json();

        // Create new student document
        const student = await Student.create({
            ...data,
            userId: user.id,
            profileCompleted: true
        });

        return NextResponse.json(
            { success: true, data: student },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error in POST /api/form:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// Optionally add a GET handler if you need to fetch student data
export async function GET(request) {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();

        if (!user || !user.id) {
            return NextResponse.json(
                { error: "Unauthorized access" },
                { status: 401 }
            );
        }

        await connectDB();

        const student = await Student.findOne({ userId: user.id });

        if (!student) {
            return NextResponse.json(
                { success: false, error: "Student not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: student },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in GET /api/form:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}