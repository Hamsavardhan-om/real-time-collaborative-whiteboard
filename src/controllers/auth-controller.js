import {APIResponse} from "../utils/api-response.js"
import {APIError} from "../utils/api-error.js"
import {asyncHandler} from "../utils/async-handler.js"
import {User} from "../models/user-model.js"
import {sendEmail, emailVerificationMailgenContent } from "../services/mail.js"

const generateAccessAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID);
        if(!user)
        throw new APIError(404, "User not found while generating token");
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

const loginUser = asyncHandler(async (req, res) =>
{
    const {username, email, password} = req.body;

    const user = await User.findOne({email});

    if(!user)
    return APIError(404,"User not found");

    const validPassword = await user.isPasswordCorrect(password)

    if(!validPassword)
    throw new APIError(400, "Invalid credentials");

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new APIResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        )
})

export {
    registerUser,
    loginUser
}