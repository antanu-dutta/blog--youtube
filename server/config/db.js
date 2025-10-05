import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("database connected successfully")
    );
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("error while connecting mongodb", error);
  }
};
