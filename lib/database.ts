// lib/database.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable");
}

interface MongooseCache {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
}

declare global {
    var mongooseCache: MongooseCache;
}

let cached = global.mongooseCache || { conn: null, promise: null };

async function dbConnect(): Promise<mongoose.Connection> {
    if (cached.conn) {
        console.log("Using cached database connection");
        return cached.conn;
    }

    if (!cached.promise) {
        console.log("Creating new database connection...");
        cached.promise = mongoose.connect(MONGO_URI).then((mongooseInstance) => mongooseInstance.connection);
    }

    try {
        cached.conn = await cached.promise;
        console.log("Database connected successfully");
    } catch (e) {
        cached.promise = null;
        console.error("Database connection failed:", e);
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
