import mongoose from "mongoose";


export type RoleDocument = mongoose.Document & {
    roleId?: string;
    name: string;
    permissionIds: mongoose.Types.ObjectId[];
}


const RoleSchema = new mongoose.Schema<RoleDocument>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    permissionIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        required: false,
    }],
});



export const Role = mongoose.model<RoleDocument>("Role", RoleSchema);