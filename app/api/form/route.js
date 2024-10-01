// app/api/form/route.js

import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/libs/clientPromise';

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("mongodb-example");
        const collection = db.collection("studentDetails");

        const body = await request.json();
        const result = await collection.insertOne(body);

        return NextResponse.json({ message: 'Student created successfully', id: result.insertedId }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating student', error: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db("mongodb-example");
        const collection = db.collection("studentDetails");

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        console.log("ID : ", id);

        if (id) {
            const student = await collection.findOne({ _id: id });
            if (!student) {
                return NextResponse.json({ message: 'Student not found' }, { status: 404 });
            }
            return NextResponse.json(student);
        } else {
            const students = await collection.find({}).toArray();
            return NextResponse.json(students);
        }
    } catch (error) {
        return NextResponse.json({ message: 'Error retrieving student(s)', error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const client = await clientPromise;
        const db = client.db("mongodb-example");
        const collection = db.collection("studentDetails");

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'ID is required for updating' }, { status: 400 });
        }

        const body = await request.json();
        const result = await collection.updateOne(
            { _id: id },
            { $set: body }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: 'Student not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Student updated successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating student', error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const client = await clientPromise;
        const db = client.db("mongodb-example");
        const collection = db.collection("studentDetails");

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'ID is required for deletion' }, { status: 400 });
        }

        const result = await collection.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Student not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Student deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting student', error: error.message }, { status: 500 });
    }
}