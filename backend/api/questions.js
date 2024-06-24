const express = require('express');
const { client, connectDB } = require('./connectDB');

const app = express();
app.use(express.json());

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