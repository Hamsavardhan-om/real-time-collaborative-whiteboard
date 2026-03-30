import { Router } from "express";
import { createBoard } from "../controllers/board-controller.js";
import { verifyJWT } from "../middlewares/auth-middleware.js";

const router = new Router();

//secure routes

router.route("/").post(verifyJWT, createBoard);

export default router;