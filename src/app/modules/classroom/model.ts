import mongoose from "mongoose";

export type ClassroomDocument = mongoose.Document & {
    name: string;
    schoolId: mongoose.Types.ObjectId;
    capacity: number;
};

const ClassroomSchema = new mongoose.Schema<ClassroomDocument>({
    name: {
        type: String,
        required: true,
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
        default: 30,
    },
},
{
    timestamps: true,
    collection: "Classroom",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

export const Classroom = mongoose.model<ClassroomDocument>("Classroom", ClassroomSchema);
