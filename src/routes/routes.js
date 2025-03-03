import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.get("/login", (req, res) => {
    res.send("Login");
});

router.post("/register", (req, res) => {
    res.send("Register");
})

router.post("/tasks", (req, res) => {
    res.send("Tasks");
})

router.get("/tasks", (req, res) => {
    res.send("getTasks");
})

router.delete("/tasks/:id", (req, res) => {
    res.send("deleteTasks");
})

router.put("/tasks/:id", (req, res) => {
    res.send("editTasks");
})
export default router;