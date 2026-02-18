import { Student, StudentDocument } from "./model.js";
import { NotFoundError, ConflictError } from "../../utils/error.js";

export const createStudent = async (data: Partial<StudentDocument>) => {
    const exists = await Student.findOne({ email: data.email });
    if (exists) throw new ConflictError("Student with this email already exists");
    const student = await Student.create(data);
    return {
        success: true,
        message: "Student created successfully",
        data: student,
    };
};

export const getStudents = async (schoolId: string) => {
    const students = await Student.find({ schoolId });
    return {
        success: true,
        message: "Students retrieved successfully",
        data: students,
    };
};

export const getStudentById = async (studentId: string) => {
    const student = await Student.findById(studentId);
    if (!student) throw new NotFoundError("Student not found");
    return {
        success: true,
        message: "Student retrieved successfully",
        data: student,
    };
};

export const updateStudent = async (studentId: string, data: Partial<StudentDocument>) => {
    const student = await Student.findByIdAndUpdate(studentId, data, { new: true });
    if (!student) throw new NotFoundError("Student not found");
    return {
        success: true,
        message: "Student updated successfully",
        data: student,
    };
};

export const deleteStudent = async (studentId: string) => {
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) throw new NotFoundError("Student not found");
    return {
        success: true,
        message: "Student deleted successfully",
    };
};

export const enrollStudent = async (studentId: string, classroomId: string) => {
    const student = await Student.findByIdAndUpdate(studentId, { classroomId, enrolled: true }, { new: true });
    if (!student) throw new NotFoundError("Student not found");
    return {
        success: true,
        message: "Student enrolled in classroom",
        data: student,
    };
};

export const transferStudent = async (studentId: string, newSchoolId: string) => {
    const student = await Student.findByIdAndUpdate(studentId, { schoolId: newSchoolId, classroomId: null }, { new: true });
    if (!student) throw new NotFoundError("Student not found");
    return {
        success: true,
        message: "Student transferred to new school",
        data: student,
    };
};
