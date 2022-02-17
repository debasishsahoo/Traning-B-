const Task = require('../models/task.model')
const AsyncWrapper = require('../middlewares/asyncWrapper')

const getAllTask = AsyncWrapper(async (req, res) => {
    const task = await Task.find({})

    if (!task || task.length <= 0) { return res.status(404).json({ success: false, message: 'Task not found' }) }

    res.status(200).json({ success: true, message: 'Task Found', task: task })
})

const createTask = AsyncWrapper(async (req, res) => {
    const { name, iscomplete } = req.body
    const task = await Task.create({ name: name, iscomplete: iscomplete });
    if (!task) { return res.status(404).json({ success: false, message: 'Task Not Inserted' }) }
    res.status(201).json({ success: true, message: `Task Inserted with id ${task._id} `, task: task })
})

const getTask = AsyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const task = await Task.findOne({ _id: taskId })
    if (!task) { return res.status(404).json({ success: false, message: 'Task not found' }) }
    res.status(200).json({ success: true, message: 'Task Found', task: task })
})

const updatePutTask = AsyncWrapper(async (req, res) => {

    const { id: taskId } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true,
        overwrite: true
    })

    if (!task) { return res.status(404).json({ success: false, message: `Task not found with ${taskId}` }) }

    res.status(200).json({ success: true, message: 'Task Updated', task: task })

})

const updatePatchTask = AsyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true
    })

    if (!task) { return res.status(404).json({ success: false, message: `Task not found with ${taskId}` }) }

    res.status(200).json({ success: true, message: 'Task Updated', task: task })
})

const deleteTask = AsyncWrapper(async (req, res) => {

    const { id: taskId } = req.params
    const task = await Task.findOneAndDelete({ _id: taskId })

    if (!task) { return res.status(404).json({ success: false, message: `Task not found with ${taskId}` }) }

    res.status(200).json({ success: true, message: 'Task Deleted', task: null })
})




module.exports = {
    getAllTask,
    createTask,
    getTask,
    updatePutTask,
    updatePatchTask,
    deleteTask
}