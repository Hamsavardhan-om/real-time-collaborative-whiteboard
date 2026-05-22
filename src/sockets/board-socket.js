const registerBoardEvents = (socket, io) =>
{
    socket.on("join_board", (data) =>
    {
        const { boardID } = data

        socket.join(boardID)

        console.log(`${socket.id} joined board ${boardID}`)
    })
}

export default registerBoardEvents