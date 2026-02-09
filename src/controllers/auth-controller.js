import {APIResponse} from "../utils/api-response.js"
import {APIError} from "../utils/api-error.js"
import {asyncHandler} from "../utils/async-handler.js"
import {User} from "../models/user-model.js"
import {sendEmail, emailVerificationMailgenContent, } from "../utils/mail.js"

const generateAccessAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new APIError(
            500,
            "Something went wrong when generating access token",
        );
    }
};

const registerUser = asyncHandler(async(req,res) => 
{
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existingUser) throw new APIError(409, "User already exists");

    const user = await User.create({
        email,
        password,
        username,
        isEmailVerified: false,
    });

    const { unhashedToken, hashedToken, tokenExpiry } = user.generateTempToken();   

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;
    user.lastVerificationEmailSentAt = new Date();

    await user.save({ validateBeforeSave: false });

    await sendEmail({
        email: user?.email,
        subject: "Please verify your email",
        mailgenContent: emailVerificationMailgenContent(
            user.username,
            `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashedToken}`,
        ),
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

    if (!createdUser)
        throw new APIError(
            500,
            "something went wrong while registering the user",
        );

    return res
        .status(201)
        .json(
            new APIResponse(
                201,
                { user: createdUser },
                "User registered successfully and verification email has been to your email",
            ),
        );
})

export {
    registerUser
}