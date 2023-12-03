import express from "express";
import { CreateUser } from "../controllers/users.js";

const router = express.Router();

router.post("/", CreateUser);

export default router;
