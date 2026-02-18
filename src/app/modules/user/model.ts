import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export type UserDocument = mongoose.Document & {
    fullName: string;
    email: string;
    password: string;
    isActive: boolean;
    roleId: mongoose.Types.ObjectId;
    permissionIds: mongoose.Types.ObjectId[];
    otp: string;
    expired_at: Date;

    comparePassword(candidatePassword: string): Promise<boolean>;
    generateJWT(): Promise<string>;
};

export type UserDataType = {
    fullName: string;
    email: string;
    password: string;
    roleId: string;
    permissionIds?: string[];
};

const UserSchema = new mongoose.Schema<UserDocument>(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true
        },
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",
            required: false,
        },
        permissionIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission",
            required: false,
        }],
        otp: {
            type: String,
            required: false,
        },
        expired_at: {
            type: Date,
            required: false,
        },
    },
    {
        timestamps: true,
        collection: "User",
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

// Virtual to get all effective permissions (role + user)
UserSchema.virtual('effectivePermissions', {
    ref: 'Permission',
    localField: 'roleId',
    foreignField: '_id',
    justOne: false,
});



UserSchema.pre("save", async function (this: UserDocument, next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(9);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

UserSchema.methods.generateJWT = function () {
    const expiresIn = process.env.JWT_TOKEN_VALIDITY as string;
    const token = jwt.sign(
        {
            id: this._id,
            email: this.email,
            role: this.role,
            roleId: this.roleId,
            permissionIds: this.permissionIds
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] }
    );
    return token;
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
