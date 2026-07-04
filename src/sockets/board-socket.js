import { Stroke } from "../models/stroke-model.js"

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

        socket.to(boardID).emit("stroke_update",
        {
            strokeID,
            point
        })
    })
}

export default registerBoardEvents