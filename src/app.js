import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: "true", limit: "16kb"}));
app.use(express.static("public"));

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "https://localhost:5173",
    credentials: true,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"]
}));

app.use(cookieParser());

//import routes
import healthCheckRouter from "./routes/healthcheck-route.js";

//Endpoints configuration
app.use("/api/v1/healthcheck", healthCheckRouter);


app.get("/",(req,res) =>
{
    res.send("App is working fine!");
});

export default app;