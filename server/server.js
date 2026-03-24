import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import taskRouter from './routes/tasks.routes.js'
dotenv.config()

const server = express()
const PORT = process.env.PORT
const db = process.env.MONGO_URL

server.use(express.json())

server.get('/', (req, res) => {
    res.send('server is working')
})

server.use('/tasks', taskRouter)

server.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "ROUTE NOT FOUND"
    })
})

await mongoose.connect(db)

server.listen(PORT, () => {
    console.log('server is listening at ' + PORT);
})