import mongoose from "mongoose";

export type PermissionDocument = mongoose.Document & {
    name: string;
}

const PermissionSchema = new mongoose.Schema<PermissionDocument>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
},
{
    timestamps: true,
    collection: "Permission",
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

export const Permission = mongoose.model<PermissionDocument>("Permission", PermissionSchema);
