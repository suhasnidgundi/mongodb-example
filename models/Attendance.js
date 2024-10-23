import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  date: Date,
  status: String,
  inTime: String,
  outTime: String,
  attendancePercentage: Number
});

export const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
