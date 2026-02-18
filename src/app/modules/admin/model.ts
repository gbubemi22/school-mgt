import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export type AdminDocument = mongoose.Document & {
  fullName: string;
  email: string;
  password: string;
  role: string;
  roleId?: mongoose.Types.ObjectId;
  otp: string;
  expired_at: Date;

  lastLoginDevice: {
    userAgent: String;
    appVersion: String;
    platform: String;
    platformVersion: String;
    device: String;
    notificationToken: String;
    expoPushNotificationToken: String;
    devicePushNotificationToken: String;
  };

  comparePassword(candidatePassword: string): Promise<boolean>;
  generateJWT(): Promise<string>;
};



const AdminSchema = new mongoose.Schema<AdminDocument>(
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

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: false,
    },

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
    collection: "Admin",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(9);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

AdminSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

AdminSchema.methods.generateJWT = function () {
  const expiresIn = process.env.JWT_TOKEN_VALIDITY as string;

  const token = jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role,
      roleId: this.roleId,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] }
  );
  return token;
};

const Admin = mongoose.model<AdminDocument>("Admin", AdminSchema);

export default Admin;

export type AdminDataType = {
  fullName: string;
  email: string;
  password: string;
  role: string;
  roleId?: string | mongoose.Types.ObjectId;
};
