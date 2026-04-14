import { Server } from "socket.io"

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

        socket.on("ping", () =>
        {
            console.log("Ping received:", socket.id)
            socket.emit("pong")
        })

        socket.on("disconnect", () =>
        {
            console.log(`User disconnected: ${socket.id}`)
        })
    })
}

export default initializeSocket