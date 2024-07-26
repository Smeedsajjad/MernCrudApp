import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));


dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("DB Connection Successfully");
        app.listen(PORT, () => {
            console.log(`Server is Running on Port: ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

app.use("/api", route);
