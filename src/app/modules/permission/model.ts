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
});

export const Permission = mongoose.model<PermissionDocument>("Permission", PermissionSchema);
