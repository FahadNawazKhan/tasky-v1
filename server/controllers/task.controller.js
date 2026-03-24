import { Task } from "../models/Task.js"

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()

        if (!tasks || tasks.length == 0) {
            return res.status(400).json({
                success: false,
                message: 'NO TASKS FOUND'
            })
        }

        res.status(200).json({
            success: true,
            message: 'tasks fetched successfully',
            data: tasks
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'internal server error'
        })
    }
}

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params

        if (id.length != 24) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Id'
            })
        }

        const task = await Task.findById(id)
        if (!task) {
            return res.status(400).json({
                success: false,
                message: 'TASK NOT FOUND'
            })
        }

        res.status(200).json({
            success: true,
            message: 'task fetched successfully',
            data: task
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'internal server error'
        })
    }

}

export const createTask = async (req, res) => {
    try {

        const newtask = req.body
        const { task } = req.body
        if (!newtask.task || !newtask.priority || !newtask.deadline) {
            return res.status(400).json({
                success: false,
                message: 'incomplete data'
            })
        }

        const existing = await Task.findOne({ task })

        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'Task Already Exists'
            })
        }

        if (!['low', 'medium', 'high'].includes(newtask.priority)) {
            return res.status(400).json({
                success: false,
                message: 'invalid priority'
            })
        }

        const tasky = await Task.create(newtask)

        res.status(200).json({
            success: true,
            message: 'tasks created successfully',
            data: tasky
        })

    } catch (error) {

        res.status(500).send({
            success: false,
            message: 'internal server error'
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params

        if (id.length != 24) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Id'
            })
        }

        const taskid = await Task.findById(id)
        if (!taskid) {
            return res.status(400).json({
                success: false,
                message: 'TASK NOT FOUND'
            })
        }
        const { task, priority, deadline, isCompleted } = req.body

        if (!task || !priority || !deadline) {
            return res.status(400).json({
                success: false,
                message: 'incomplete data'
            })
        }

        if (!['low', 'medium', 'high'].includes(priority)) {
            return res.status(400).json({
                success: false,
                message: 'invalid priority'
            })
        }

        const updatedtask = {
            task, priority, deadline, isCompleted
        }
        const existing = await Task.findByIdAndUpdate(id, updatedtask)

        res.status(200).json({
            success: true,
            message: 'tasks updated successfully',
            data: existing
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'internal server error'
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params

        if (id.length != 24) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Id'
            })
        }

        const taskid = await Task.findById(id)
        if (!taskid) {
            return res.status(400).json({
                success: false,
                message: 'TASK NOT FOUND'
            })
        }

        const deleteid = await Task.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'tasks deleted successfully',
            data: deleteid
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'internal server error'
        })
    }
}