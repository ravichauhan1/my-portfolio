// lib/database.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio";

if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable");
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongooseCache: MongooseCache;
}

let cached = global.mongooseCache || { conn: null, promise: null };

async function dbConnect(): Promise<typeof mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = mongoose.connect(MONGO_URI, opts);
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;