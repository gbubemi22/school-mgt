import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./model.js";
import { Role } from "../role/model.js";



dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to the database ✅");

    const pass = process.env.DEFAULT_PASSWORD as string;
    const defaultEmail = process.env.DEFAULT_EMAIL as string;
    const roleName = "SUPER-ADMIN";
    const roleDoc = await Role.findOne({ name: roleName });

    if (!roleDoc) {
      throw new Error(
        `Role "${roleName}" not found. Create it first before running seedAdmin.`
      );
    }

    // --- SUPER ADMIN SEED ---
    const existingAdmin = await Admin.findOne({ email: defaultEmail });

    if (!existingAdmin) {
      const adminData = {
        email: defaultEmail,
        fullName: "Admin soar",
        password: pass, 
        role: roleName,
        roleId: roleDoc._id,
      };

      const newAdmin = await Admin.create(adminData);
      console.log("Super Admin created successfully.");

      // Generate JWT token for the new Super Admin
      if (typeof newAdmin.generateJWT === 'function') {
        const token = await newAdmin.generateJWT();
        console.log("Super Admin JWT token:", token);
      }
    } else {
      console.log("Super Admin already exists.");
    }


  } catch (error: any) {
    console.error("Error running seed script:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed script
seedAdmin();
