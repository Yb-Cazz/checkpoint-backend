
import express, {Request, Response} from "express";
import cors from "cors"
import helmet from "helmet";
import {pinoHttp} from "pino-http";


import logger from "./utils/logger.js";
import routes from "./api/routes/routes.js";
import { errorMiddleware } from "./api/middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";


const app = express()

// ---- Global Middlewares -----------------
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(pinoHttp({ logger }))
app.use(cookieParser())


// ----- Routes -----------------------------
app.use("/api/v1", routes)

// --- 404 handling --------------------
// TODO: implement 404 handling


// ---- Error Handling --------------
app.use(errorMiddleware)
export default app
    