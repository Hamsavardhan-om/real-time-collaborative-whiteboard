import { io } from "socket.io-client"

const socket = io("http://localhost:4545")

socket.on("connect", () =>
{
    console.log("Connected:", socket.id)

    socket.emit("ping");
})

socket.on("pong", () =>
{
    console.log("Received pong from server")
})