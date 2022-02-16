const Task = require('../models/task.model')

const getAllTask = async (req, res) => {
    try {
        const task = await Task.find({})

        if (!task || task.length <= 0) { return res.status(404).json({ success: false, message: 'Task not found' }) }

        res.status(200).json({ success: true, message: 'Task Found', task: task })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}
const createTask = async (req, res) => {
    const { name, iscomplete } = req.body
    try {
        const task = await Task.create({ name: name, iscomplete: iscomplete });

        if (!task) { return res.status(404).json({ success: false, message: 'Task Not Inserted' }) }

        res.status(201).json({ success: true, message: `Task Inserted with id ${task._id} `, task: task })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}
const getTask = async (req, res) => {
    try {
        const { id: taskId } = req.params
        const task = await Task.findOne({ _id: taskId })

        if (!task) { return res.status(404).json({ success: false, message: 'Task not found' }) }

        res.status(200).json({ success: true, message: 'Task Found', task: task })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}
const updatePutTask = async (req, res) => {
    try {
        const { id: taskId } = req.params
        const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
            new: true,
            runValidators: true,
            overwrite: true
        })

        if (!task) { return res.status(404).json({ success: false, message: `Task not found with ${taskId}` }) }

        res.status(200).json({ success: true, message: 'Task Updated', task: task })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

const updatePatchTask = async (req, res) => {
    try {
        const { id: taskId } = req.params
        const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
            new: true,
            runValidators: true
        })

        if (!task) { return res.status(404).json({ success: false, message: `Task not found with ${taskId}` }) }

        res.status(200).json({ success: true, message: 'Task Updated', task: task })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}
const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params
        const task = await Task.findOneAndDelete({ _id: taskId })

        if (!task) { return res.status(404).json({ success: false, message: `Task not found with ${taskId}` }) }

        res.status(200).json({ success: true, message: 'Task Deleted', task: null })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}


module.exports = {
    getAllTask,
    createTask,
    getTask,
    updatePutTask,
    updatePatchTask,
    deleteTask
}