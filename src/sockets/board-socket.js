import { log } from "node:console"
import { Stroke } from "../models/stroke-model.js"

const activeStrokes = new Map();

const registerBoardEvents = (socket, io) =>
{
    socket.on("join_board", (data) =>
    {
        const { boardID } = data

        socket.join(boardID)

        console.log(`${socket.id} joined board ${boardID}`)
    })

    socket.on("stroke_start", (data) =>
    {
        const { boardID, strokeID, point, color, thickness } = data

        console.log(`${socket.id} started drawing on board ${boardID}`)

        activeStrokes.set(strokeID, {
            boardID,
            color,
            thickness,
            path: [point]
        })

        socket.to(boardID).emit("stroke_start",
        {
            strokeID,
            point,
            color,
            thickness
        })
    })

    socket.on("stroke_update", (data) =>
    {
        const { boardID, strokeID, point } = data

        console.log( `${socket.id} updated stroke ${strokeID} at (${point.x}, ${point.y})`)

        activeStrokes.get(strokeID).path.push(point)

        socket.to(boardID).emit("stroke_update",
        {
            strokeID,
            point
        })
    })

    socket.on("stroke_end", async (data) =>
    {
        const { boardID, strokeID } = data

        console.log(`${socket.id} ended stroke ${strokeID}`);

        console.log(JSON.stringify([...activeStrokes], null, 2));

        const stroke = activeStrokes.get(strokeID)

        if (!stroke)
        {
            console.error(`Stroke ${strokeID} not found`);
            return;
        }

        try
        {
            await Stroke.create({
                boardID: stroke.boardID,
                userID: "698ac78d21293f688306feeb",
                color: stroke.color,
                thickness: stroke.thickness,
                path: stroke.path
            });

            activeStrokes.delete(strokeID);

            console.log("Save successful");
        }

        catch(error)
        {
            console.log(error);
        }
        
        socket.to(boardID).emit("stroke_end",
            {
                strokeID
            }
        )
    })
}

export default registerBoardEvents