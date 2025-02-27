import { Router } from "express";
import { login, register } from "../controller/controller.js";

const router = Router();

router.get("/", (req, res) => {
    res.json("home page!");
});

router.get("/api/login", login, (req, res) => {
    res.json("login");
})

router.get("/api/register", register, (req, res) => {
    res.json("register");
})

export default router;