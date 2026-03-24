import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        unique: true
    },

    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
        required: true
    },

    deadline: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
})

export const Task = mongoose.model('Task', taskSchema)