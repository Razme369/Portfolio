
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    const { MONGO_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } =
      process.env;

    if (!MONGO_URI || !ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error("Required environment variables are missing.");
    }

    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected.");

    const existingAdmin = await User.findOne({
      email: ADMIN_EMAIL,
    });

    if (existingAdmin) {
      existingAdmin.role = "admin";
      await existingAdmin.save();

      console.log("Existing account promoted to administrator.");
    } else {
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

      await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin",
      });

      console.log("Administrator account created successfully.");
    }
  } catch (error) {
    console.error("Admin seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedAdmin();
