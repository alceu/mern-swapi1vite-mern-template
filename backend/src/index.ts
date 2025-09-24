import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cron from "node-cron";

import routes from "./routes";
import { calculateAndPersistTopQueries } from "./services/TopSearchService";

dotenv.config();

const app = express();

const port = 5000; // Hardcoded internal port

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("Missing required environment variable: MONGO_URI");
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    // Schedule the top queries calculation and persistence every 5 minutes
    cron.schedule("*/5 * * * *", () => {
      console.log("Running scheduled task: calculateAndPersistTopQueries");
      calculateAndPersistTopQueries();
    });
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
