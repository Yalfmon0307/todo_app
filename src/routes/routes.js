import { Router } from "express";
import { login, register, createTask, getTasks, logout, deleteTask } from "../controllers/controllers.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.post("/login", login, (req, res) => {
    res.send("Login");
});

router.post("/register", register, (req, res) => {
    res.send("Register");
})

router.post("/tasks", createTask, (req, res) => {
    res.send("Tasks");
})

router.get("/tasks", getTasks, (req, res) => {
    res.send("getTasks");
})

router.delete("/tasks/:id", deleteTask, (req, res) => {
    res.send("deleteTasks");
})

router.put("/tasks/:id", (req, res) => {
    res.send("editTasks");
})

router.post("/logout", logout, (req, res) => {
    res.send("logout");
})
export default router;