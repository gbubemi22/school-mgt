import { School } from "./model.js";
import { ConflictError, NotFoundError } from "../../utils/error.js";

export const createSchool = async (data: { name: string; address: string; email: string; phone: string; adminIds?: string[] }) => {
    const exists = await School.findOne({ $or: [{ name: data.name }, { email: data.email }] });
    if (exists) throw new ConflictError("School with this name or email already exists");
    const school = await School.create({ ...data, adminIds: data.adminIds || [] });
    return {
        success: true,
        message: "School created successfully",
        data: school,
    };
};

export const getSchools = async () => {
    const schools = await School.find();
    return {
        success: true,
        message: "Schools retrieved successfully",
        data: schools,
    };
};

export const getSchoolById = async (schoolId: string) => {
    const school = await School.findById(schoolId);
    if (!school) throw new NotFoundError("School not found");
    return {
        success: true,
        message: "School retrieved successfully",
        data: school,
    };
};

export const updateSchool = async (schoolId: string, data: Partial<{ name: string; address: string; email: string; phone: string; adminIds: string[] }>) => {
    const school = await School.findByIdAndUpdate(schoolId, data, { new: true });
    if (!school) throw new NotFoundError("School not found");
    return {
        success: true,
        message: "School updated successfully",
        data: school,
    };
};

// Add an admin to a school
export const addAdminToSchool = async (schoolId: string, userId: string) => {
    const school = await School.findByIdAndUpdate(
        schoolId,
        { $addToSet: { adminIds: userId } },
        { new: true }
    );
    if (!school) throw new NotFoundError("School not found");
    return {
        success: true,
        message: "Admin added to school",
        data: school,
    };
};
export const deleteSchool = async (schoolId: string) => {
    const school = await School.findByIdAndDelete(schoolId);
    if (!school) throw new NotFoundError("School not found");
    return {
        success: true,
        message: "School deleted successfully",
    };
};
