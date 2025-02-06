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

        // if (questions.length > 0) {
        //     let questionsData = questions[0]; // Use correct variable name
        //     const { _id, ...categories } = questionsData; // Remove _id from the response

        //     // Sort keys so "General" always comes first
        //     const sortedCategories = Object.keys(categories)
        //         .sort((a, b) => {
        //             if (a === "General") return -1;
        //             if (b === "General") return 1;
        //             return a.localeCompare(b); // Sort alphabetically otherwise
        //         })
        //         .reduce((acc, key) => {
        //             acc[key] = categories[key];
        //             return acc;
        //         }, {});

        //     res.json({ _id, ...sortedCategories });  // Ensure original format
        // } else {
        //     res.status(404).json({ error: "No questions found in the database." });
        // }
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
