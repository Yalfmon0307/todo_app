import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json("home page!");
});

router.get("/api/login", (req, res) => {
    res.json("login");
})

router.get("/api/register", (req, res) => {
    res.json("register");
})

export default router;