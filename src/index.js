import dotenv from "dotenv"
import app from "./app.js";
import connectDB from "./db/database.js";
import http from "http";
import initializeSocket from "./sockets/socket.js"

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 3000;

connectDB()
    .then(() => 
    {
        const server = http.createServer(app);

        initializeSocket(server);

        server.listen(port, () => 
        {
            console.log(`App is listening on port http://localhost:${port}`,);
        });
    })

    .catch((error) => 
    {
        console.error("MongoDB connection error: ", error);
        process.exit(1);
    });