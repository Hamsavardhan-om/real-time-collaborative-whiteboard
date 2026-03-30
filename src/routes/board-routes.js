import { Router } from "express";
import { createBoard, getBoardDetails } from "../controllers/board-controller.js";
import { verifyJWT } from "../middlewares/auth-middleware.js";

const router = new Router();

//secure routes

router.route("/").post(verifyJWT, createBoard);
router.route("/:boardID").get(verifyJWT, getBoardDetails);

export default router;