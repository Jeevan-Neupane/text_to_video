import mongoose from "mongoose";

export async function connect() {
  try {
    const MONGO_URL = process.env.MONGO_URL;
    if (!MONGO_URL) {
      throw new Error("Mongo URL not found");
    }
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb connected successfully");
    });

    connection.on("error", () => {
      console.log("MongoDb connection error");
    });
  } catch (error) {
    console.log("something went wrong");
  }
}
