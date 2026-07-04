import { Router } from "express";
import { loginUser, registerUser, VerifyEmail, getCurrentUser, logoutUser } from "../controllers/auth-controller.js"
import { verifyJWT } from "../middlewares/auth-middleware.js";

const router = Router();

//unsecured routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify-email/:verificationToken").get(VerifyEmail);

//secured routes
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/logout").get(verifyJWT, logoutUser);

export default router;