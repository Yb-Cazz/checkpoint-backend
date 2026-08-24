import pino from "pino";
import { logLevel } from "../config/env.js";

const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
  level: logLevel,

  ...(isProduction
        ? {}
        : {
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    translateTime: "HH:MM:ss",
                    ignore: "pid,hostname"
                },
            },
        }
    ),
});

export default logger;