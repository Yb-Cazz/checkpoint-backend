import app from "./app.js"
import {port, nodeEnv} from "./config/env.js"
import logger from "./utils/logger.js"

import { connectDb } from "./config/database.js"

const start = async () => {
    await connectDb()

    const server = app.listen(port, ()=>{
        logger.info(`server listening on port ${port} ${nodeEnv}`)
    })

    const shutdown = (signal:string) => {
        logger.info(`${signal} received. shutting down gracefully...`)
        server.close(() => {
            logger.info('Server closed')
            process.exit(0)
        })
    }

    process.on('SIGTERM', () => shutdown('SIGTERM'))
    process.on('SIGINT', () => shutdown('SIGINT'))

    process.on('unhandledRejection', (reason) => {
        logger.error({ reason }, 'Unhandled promise rejection');
    });
}

start().catch((err) => {
    logger.error({err}, "Failed to start server")
    process.exit(1)
})