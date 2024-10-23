import mongoose from 'mongoose';

const academicPerformanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    semester: String,
    subject: String,
    internalMarks: Number,
    externalMarks: Number,
    grade: String,
    cgpa: Number
});

export const AcademicPerformance = mongoose.models.AcademicPerformance ||
    mongoose.model('AcademicPerformance', academicPerformanceSchema);
