// Imports
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser'
import dotenv from "dotenv";


// Import routers
import usersRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import mailingRoute from "./routes/mailing.js";
import contactRoute from "./routes/contact.js";

// Configs
dotenv.config();
 const corsOptions = {
     origin : process.env.CORS_ORIGIN,
     optionsSuccessStatus : 200,
 }

// Initiallisation de l'app
const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Port d'écoute
app.listen(process.env.APP_BACK_PORT, () => console.log(`Connected to Backend on port ${process.env.APP_BACK_PORT}`));

// Routes
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/mailing", mailingRoute);
app.use("/api/contact", contactRoute);


// Gestion de l'erreur
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`${err.message}`)
})
