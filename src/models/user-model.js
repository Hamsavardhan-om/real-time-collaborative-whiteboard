import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
    {
        username:
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },

        email:
        {
            type: String,
            required: true,
            unique: true, 
            lowercase: true,
            trim: true
        },

        fullname: 
        {
            type: String,
            trim: true
        },

        password: 
        {
            type: String,
            required: [true, "Password is required"]
        },

        isEmailVerified: 
        {
            type: Boolean,
            default: false
        },

        refreshToken: 
        {
            type: String
        },

        forgotPasswordToken: 
        {
            type: String
        },

        forgotPasswordExpiry: 
        {
            type: Date
        },

        emailVerificationToken: 
        {
            type: String
        },

        emailVerificationExpiry: 
        {
            type: Date
        }, 

        lastVerificationEmailSentAt: 
        {
            type: Date
        }
    },

    {
        timestamps: true
    }
)

userSchema.pre("save", async function()
{
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) 
{
    return await bcrypt.compare(password, this.password);
}

// Data JWT which are used to authenticate the user at each request. 
userSchema.methods.generateAccessToken = function ()
{
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_HIDDEN,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

userSchema.methods.generateRefreshToken = function ()
{
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_HIDDEN,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    )
}

//Non data JWT which are used to verify an user, also used for forgot password mechanism
userSchema.methods.generateTempToken = function ()
{
    const unhashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(unhashedToken)
        .digest("hex")

    const tokenExpiry = Date.now() + (20*60*1000) //this is 20 mins, denoted in ms

    return {unhashedToken, hashedToken, tokenExpiry};
}

export const User = mongoose.model("User", userSchema);