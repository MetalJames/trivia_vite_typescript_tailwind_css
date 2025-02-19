import express from "express";
import { client } from "../config/db";
import { sortCategories } from "../utils/utils";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const database = client.db("volodymyrruzhak");
        const collection = database.collection("trivia_quiz_game_extended");
        const questions = await collection.find({}).toArray();

        if (questions.length > 0) {
            let questionsData = questions[0];
            const { _id, ...categories } = questionsData;

            const sortedCategories = sortCategories(categories);

            res.json({ _id, ...sortedCategories });
        } else {
            res.status(404).json({ error: "No questions found in the database." });
        }
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

export default router;