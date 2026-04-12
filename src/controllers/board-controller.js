import { asyncHandler } from "../utils/async-handler.js";
import { APIError } from "../utils/api-error.js";
import { APIResponse } from "../utils/api-response.js";
import { Board } from "../models/board-model.js"
import { Stroke } from "../models/stroke-model.js";
import { User } from "../models/user-model.js";

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

    if(!board)
    throw new APIError(404,"Board not found");

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

const getBoardData = asyncHandler(async(req,res) =>
{
    const {boardID} = req.params;

    const strokes = await Stroke.find({ boardId: boardID });

    if(!strokes)
    throw new APIError(404,"Strokes not found");

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                "Strokes found",
                strokes
            )
        )
})

const addCollaborators = asyncHandler(async(req,res) =>
{
    const {boardID} = req.params;
    const {collaborators} = req.body;

    const board = await Board.findById(boardID);

    if(!board)
    throw new APIError(404,"Board not found");

    for(const collaborator of collaborators)
    {
        const { username, email, role } = collaborator;
        let collaboratorExists = false;

        const user = await User.findOne({$or: [{ username }, { email }]});

        if(!user)
        throw new APIError(404,"user not found")

        for(const collaborator of board.collaborators)
        {
            if(collaborator.user.equals(user._id))
            collaboratorExists = true;
        }

        if(!collaboratorExists)
        {
            board.collaborators.push(
                {
                    user: user._id,
                    role: role
                }
            )
        }
    }

    await board.save({validateBeforeSave: false})

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                "Adding collaborators successful"
            )
        )
})

const removeCollaborator = asyncHandler(async(req,res) =>
{
    const {boardID, userID} = req.params;

    const board = await Board.findById(boardID);

    if(!board)
    throw new APIError(404,"Board not found");

    let index = board.collaborators.findIndex(collab => collab.user.toString() === userID);
    if(index === -1)
    throw new APIError(400,"requested user is not a collaborator");

    board.collaborators.splice(index,1);

    await board.save({validateBeforeSave: false});

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                "Requested user deleted successfully"
            )
        )
})

export {
    createBoard,
    getBoardDetails,
    getBoardData,
    addCollaborators,
    removeCollaborator
}