import { Router } from "express";
import { addCollaborators, createBoard, getBoardData, getBoardDetails, removeCollaborator } from "../controllers/board-controller.js";
import { verifyJWT } from "../middlewares/auth-middleware.js";

const router = new Router();

//secure routes

router.route("/").post(verifyJWT, createBoard);
router.route("/:boardID").get(verifyJWT, getBoardDetails);
router.route("/:boardID/strokes").get(verifyJWT, getBoardData);
router.route("/:boardID/collaborators").post(verifyJWT, addCollaborators);
router.route("/:boardID/collaborators/:userID").delete(verifyJWT, removeCollaborator);

export default router;