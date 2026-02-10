import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth-controller.js"

const router = Router();

//unsecured routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;