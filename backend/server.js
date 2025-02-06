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

        if (questions.length > 0) {
            let questions = questionsArray[0]; // Assuming only one document stores all categories
            const { _id, ...categories } = questions; // Remove _id from the response

            // Sort keys so "General" always comes first
            const sortedCategories = Object.keys(categories).sort((a, b) => {
                if (a === "General") return -1;
                if (b === "General") return 1;
                return a.localeCompare(b); // Sort alphabetically otherwise
            }).reduce((acc, key) => {
                acc[key] = categories[key];
                return acc;
            }, {});

            res.json(sortedCategories);
        } else {
            res.status(404).json({ error: "No questions found in the database." });
        }

        // res.json(questions);
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
