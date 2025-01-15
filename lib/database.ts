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

// Use the global cache to avoid re-initializing the database connection
let cached = global.mongooseCache || { conn: null, promise: null };

async function dbConnect(): Promise<mongoose.Connection> {
    if (cached.conn) {
        // If the connection is cached, use it
        return cached.conn;
    }

    if (!cached.promise) {
        // If there's no cached promise, initiate a new connection
        cached.promise = mongoose.connect(MONGO_URI).then((mongooseInstance) => mongooseInstance.connection);
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        // Reset the promise if there's an error and throw it
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;
