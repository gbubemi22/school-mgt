import mongoose from "mongoose";

export type StudentDocument = mongoose.Document & {
    firstName: string;
    lastName: string;
    email: string;
    schoolId: mongoose.Types.ObjectId;
    classroomId?: mongoose.Types.ObjectId;
    enrolled: boolean;
    profile: {
        dob?: Date;
        address?: string;
        guardianName?: string;
        guardianContact?: string;
        [key: string]: any;
    };
};

const StudentSchema = new mongoose.Schema<StudentDocument>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    classroomId: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom", required: false },
    enrolled: { type: Boolean, default: true },
    profile: {
        dob: Date,
        address: String,
        guardianName: String,
        guardianContact: String,
    },
},
    {
        timestamps: true,
        collection: "Student",
        collation: {
            locale: "en",
            strength: 1,
            caseLevel: true,
            numericOrdering: true,
        },
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

export const Student = mongoose.model<StudentDocument>("Student", StudentSchema);
