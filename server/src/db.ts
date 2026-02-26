import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable");
}

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  mongoose.set("strictQuery", true);

  if (MONGODB_URI) {
    cachedConnection = await mongoose.connect(MONGODB_URI);
  } else {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  return cachedConnection;
}
