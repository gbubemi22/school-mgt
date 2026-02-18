import { Classroom } from "./model.js";
import { NotFoundError, ConflictError } from "../../utils/error.js";

export const createClassroom = async (data: { name: string; schoolId: string; capacity?: number }) => {
    const exists = await Classroom.findOne({ name: data.name, schoolId: data.schoolId });
    if (exists) throw new ConflictError("Classroom with this name already exists in this school");
    const classroom = await Classroom.create(data);
    return {
        success: true,
        message: "Classroom created successfully",
        data: classroom,
    };
};

export const getClassrooms = async (schoolId: string) => {
    const classrooms = await Classroom.find({ schoolId });
    return {
        success: true,
        message: "Classrooms retrieved successfully",
        data: classrooms,
    };
};

export const getClassroomById = async (classroomId: string) => {
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) throw new NotFoundError("Classroom not found");
    return {
        success: true,
        message: "Classroom retrieved successfully",
        data: classroom,
    };
};

export const updateClassroom = async (classroomId: string, data: Partial<{ name: string; capacity: number }>) => {
    const classroom = await Classroom.findByIdAndUpdate(classroomId, data, { new: true });
    if (!classroom) throw new NotFoundError("Classroom not found");
    return {
        success: true,
        message: "Classroom updated successfully",
        data: classroom,
    };
};

export const deleteClassroom = async (classroomId: string) => {
    const classroom = await Classroom.findByIdAndDelete(classroomId);
    if (!classroom) throw new NotFoundError("Classroom not found");
    return {
        success: true,
        message: "Classroom deleted successfully",
        data: {}
    };
};
