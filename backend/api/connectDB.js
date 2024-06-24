const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDB() {
    try {
        if (!client.isConnected()) {
            await client.connect();
            console.log("Connected to MongoDB!");
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = { client, connectDB };