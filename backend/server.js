const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error(err);
    }
}

connectDB();

app.get('/questions', async (req, res) => {
    try {
        const database = client.db('volodymyrruzhak'); // replace with your database name
        const collection = database.collection('trivia_quiz_game_extended'); // replace with your collection name
        const questions = await collection.find({}).toArray();
        res.json(questions);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Cron job route
app.get('/cron-job', (req, res) => {
    // Perform cron job tasks
    // Return minimal output
    res.send('OK'); // Or any minimal status message
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
