import mongoose from "mongoose";

export async function connect() {
  try {
    const MONGO_URL = process.env.MONGO_URL;
    if (!MONGO_URL) {
      throw new Error("Mongo URL not found");
    }

    // Use options to handle connection timeouts and retries
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,  // 30 seconds timeout
      connectTimeoutMS: 30000,          // 30 seconds connection timeout
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

  } catch (error) {
    console.error("Something went wrong with MongoDB connection:", error);
  }
}
