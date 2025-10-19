import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGDO_CONNECCTION_STRING);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1); // exit process with failure
  }
};
