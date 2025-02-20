import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import questionRoutes from "./routes/questions";
import cronRoutes from "./routes/cron";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/questions", questionRoutes);
app.use("/cron-job", cronRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});