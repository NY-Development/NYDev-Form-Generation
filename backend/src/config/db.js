import mongoose from "mongoose";

const connectDb = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  await mongoose.connect(uri);
  return mongoose.connection;
};

export default connectDb;
