import express from "express";
import tasksRouter from "./routes/tasksRouter.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5001;

dotenv.config();

// middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/tasks", tasksRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

export default app;
