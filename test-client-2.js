import { io } from "socket.io-client"

const socket = io("http://localhost:4545")

socket.on("connect", () =>
{
    console.log("Receiver connected:", socket.id)

    socket.emit("join_board", { boardID: "boardA" })
})

socket.on("stroke_start", (data) =>
{
    console.log("Received stroke_start:", data)
})

socket.on("stroke_update", (data) =>
{
    console.log("Received stroke_update:", data)
})