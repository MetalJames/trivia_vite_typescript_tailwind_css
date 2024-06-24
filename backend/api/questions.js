const express = require('express');
const cors = require('cors');
const { client, connectDB } = require('./connectDB');

const app = express();
app.use(express.json());

const allowedOrigins = ['https://your-frontend.vercel.app']; // Replace with your frontend URL(s)
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.get('/questions', async (req, res) => {
    await connectDB();
    try {
        const database = client.db('volodymyrruzhak'); // replace with your database name
        const collection = database.collection('trivia_quiz_game_extended'); // replace with your collection name
        const questions = await collection.find({}).toArray();
        res.json(questions);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = app;
