import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI as string;

if (!uri) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
}

export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export const connectDB = async () => {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB!");
        await client.db().admin().ping();
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    }
};

process.on("SIGINT", async () => {
    await client.close();
    console.log("🛑 MongoDB connection closed.");
    process.exit(0);
});