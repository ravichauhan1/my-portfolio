// lib/database.ts
import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://rc5383467:sVzmWF94c0hJFW2a@portfolio-contacts.0dj7g.mongodb.net/?retryWrites=true&w=majority";

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