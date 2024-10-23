import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    email: String,
    dateOfBirth: Date,
    gender: String,
    course: String,
    address: String,
    profileCompleted: {
        type: Boolean,
        default: false
    }
});

export const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);
