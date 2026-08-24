import "dotenv/config"
import { StringValue } from "ms"

export const nodeEnv = process.env.NODE_ENV || 'development'
export const port = process.env.PORT || 3000
export const logLevel = process.env.LOG_LEVEL || 'info'
export const databaseUrl = process.env.DATABASE_URL
export const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET
export const jwtSecret = process.env.JWT_SECRET!
export const jwtExpiresIn: StringValue = (process.env.JWT_EXPIRES_IN as StringValue) || "1h";
