import { User } from "../models/user-model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { APIError } from "../utils/api-error.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req,res,next) =>
{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if(!token)
    throw new APIError(401, "Unauthorized request")

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_HIDDEN)
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
        )

        if(!user)
        throw new APIError(401, "Invalid Access Token")

        req.user = user;
        next()
    } catch (error) {
        throw new APIError(401, "Invalid or expired Access Token")
    }
})