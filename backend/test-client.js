import { io } from "socket.io-client"

const socket = io("http://localhost:4545")

socket.on("connect", () =>
{
    console.log("Connected:", socket.id)

    socket.emit("join_board", { boardID: "69cab36a6dc82cd19f65378a" })

    setTimeout(() =>
    {
        socket.emit("stroke_start",
        {
            boardID: "69cab36a6dc82cd19f65378a",
            strokeID: "stroke1",
            point:
            {
                x: 10,
                y: 20
            },
            color: "red",
            thickness: 5
        })

        socket.emit("stroke_update",
        {
            boardID: "69cab36a6dc82cd19f65378a",
            strokeID: "stroke1",
            point:
            {
                x: 15,
                y: 25
            }
        })

        socket.emit("stroke_update",
        {
            boardID: "69cab36a6dc82cd19f65378a",
            strokeID: "stroke1",
            point:
            {
                x: 20,
                y: 30
            }
        })

        socket.emit("stroke_update",
        {
            boardID: "69cab36a6dc82cd19f65378a",
            strokeID: "stroke1",
            point:
            {
                x: 25,
                y: 35
            }
        })

        socket.emit("stroke_end",
        {
            boardID: "69cab36a6dc82cd19f65378a",
            strokeID: "stroke1"
        })

    }, 2000)
})