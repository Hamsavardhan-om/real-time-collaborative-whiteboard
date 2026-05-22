import { Server } from "socket.io"
import registerBoardEvents from "./board-socket.js"

const initializeSocket = (server) =>
{
    const io = new Server(server, 
    {
        cors: 
        {
            origin: "*"
        }
    })

    io.on("connection", (socket) =>
    {
        console.log(`User connected: ${socket.id}`)

        registerBoardEvents(socket, io)

        socket.on("disconnect", () =>
        {
            console.log(`User disconnected: ${socket.id}`)
        })
    })
}

export default initializeSocket