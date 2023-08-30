const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    
    },
    task_name: {
        type: String,
        require: true,
    },
    task_description: {
        type: String,
        require: true,
    },
    task_image: {
        type: String,
        require: true,
    },
    task_status: {
        type: String,
        require: true,
    },
       
    task_deadline: {
        type: String,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true
    }

})
taskSchema.set('timestamps', true)
module.exports = mongoose.model('task', taskSchema)