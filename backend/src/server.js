import express from "express";
import tasksRouter from "./routes/tasksRouter.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
const app = express();

const PORT = process.env.PORT || 5001;

dotenv.config();

connectDB();

app.use(express.json());

app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
