const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Name can not be less then 3 Characters'],
        maxlength: [20, 'Name can not be more then 20 Characters']
    },
    iscomplete: {
        type: Boolean,
        default:false,
    }
})
module.exports = mongoose.model('Task', TaskSchema)    