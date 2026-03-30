import { asyncHandler } from "../utils/async-handler.js";
import { APIError } from "../utils/api-error.js";
import { APIResponse } from "../utils/api-response.js";
import { Board } from "../models/board-model.js"
import { User } from "../models/user-model.js";
import { title } from "process";

const createBoard = asyncHandler(async(req,res) =>
{
    const { title, description } = req.body;
    const user = req.user;

    try
    {
        const board = await Board.create({
            title: title,
            description: description,
            owner: user._id,
            collaborators: [
                {
                    user: user._id,
                    role: "owner"
                }
            ]
        })

        return res
            .status(201)
            .json(
                new APIResponse(
                    201,
                    "Board created",
                    board
                )
            )
    }

    catch(error)
    {
        throw new APIError(400,"something went wrong")
    }
})

const getBoardDetails = asyncHandler(async(req,res) =>
{
    const {boardID} = req.params;

    const board = await Board.findById(boardID).select('title owner collaborators');

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                "Board found",
                board
            )
        )
})

export {
    createBoard,
    getBoardDetails
}