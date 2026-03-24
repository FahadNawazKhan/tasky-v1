import express from 'express'
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controllers/task.controller.js'

const router = express.Router()

router.get('/alltasks', getAllTasks)
router.get('/taskbyid/:id', getTaskById)
router.post('/createtask', createTask)
router.put('/updatetask/:id', updateTask)
router.delete('/deletetask/:id', deleteTask)

router.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "ROUTE NOT FOUND"
    })
})

export default router