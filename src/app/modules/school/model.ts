import mongoose from "mongoose";

export type SchoolDocument = mongoose.Document & {
    name: string;
    address: string;
    email: string;
    phone: string;
    adminIds: mongoose.Types.ObjectId[];
};

const SchoolSchema = new mongoose.Schema<SchoolDocument>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    adminIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    }],
},
{
        timestamps: true,
        collection: "School",
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

export const School = mongoose.model<SchoolDocument>("School", SchoolSchema);
