import { Router } from "express";
import { createBoard, getBoardData, getBoardDetails } from "../controllers/board-controller.js";
import { verifyJWT } from "../middlewares/auth-middleware.js";

const router = new Router();

//secure routes

router.route("/").post(verifyJWT, createBoard);
router.route("/:boardID").get(verifyJWT, getBoardDetails);
router.route("/:boardID/strokes").get(verifyJWT, getBoardData);

export default router;