import { io } from "socket.io-client"

const socket = io("http://localhost:4545")

socket.on("connect", () =>
{
    console.log("Connected:", socket.id)

    socket.emit("join_board", { boardID: "boardA" })

    setTimeout(() =>
    {
        socket.emit("stroke_start",
        {
            boardID: "boardA",
            strokeID: "stroke1",
            point:
            {
                x: 10,
                y: 20
            },
            color: "red",
            thickness: 5
        })
    }, 2000)
})