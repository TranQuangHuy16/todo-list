import e from "express";
import express from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/tasksControllers.js";

const router = express.Router();

router.get("/", (req, res) => {
  getAllTasks(req, res);
});

router.post("/", (req, res) => {
  createTask(req, res);
});

router.put("/:id", (req, res) => {
  updateTask(req, res);
});

router.delete("/:id", (req, res) => {
  deleteTask(req, res);
});

export default router;
