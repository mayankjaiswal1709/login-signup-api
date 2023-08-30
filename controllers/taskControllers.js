const express = require('express')
const taskSchema = require('../models/taskSchema')
const uploads = require('../middleware/multer')
const fs = require('fs')

// add Task api
const addTask = async (req, res) => {
    try {
        const taskData = new taskSchema(req.body);
        if (taskData != null) {
            taskData.task_image = `/uploads/${(req.file.filename)}`;
            taskData.userId = req.userId;
            taskData.projectId = req.params.pid;
            await taskData.save();
            res.status(200).json({
                success: true,
                message: "Task Added Successfully",
                Task: taskData,
            })
        } else {
            fs.unlinkSync(req.file.path)
            res.status(404).json({
                success: false,
                message: "no Task added try again "

            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error occur ${error.stack}`,
        });
    }
};

// see  all Tasks
const getTasks = async (req, res) => {
    try {
        const allTaskList = await taskSchema.find(req.body)
        if (allTaskList != null) {
            return res.status(200).json({
                sucess: true,
                message: "your all Task list below",
                TaskList: allTaskList
            })

        } else {
            res.status(404).json({
                success: false,
                message: "No Task Found"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error occurs${error.message}`
        })
    }
}

// edit Task 
const editTask = async (req, res) => {
    try {
        const { _id } = req.params
        const taskedit = await taskSchema.findByIdAndUpdate({ _id }, req.body)
        if (taskedit != null) {
            await taskedit.save()
            res.status(200).json({
                success: true,
                message: "Task added successfull ",
                Taskedit: taskedit
            })
        } else {
            res.status(404).json({
                success: false,
                message: "No Task edited and updated try again "
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

// delete reveiw 
const deleteTask = async (req, res) => {
    try {
        const { _id } = req.params
        const taskdeleted = await taskSchema.findByIdAndDelete({ _id }, req.body)
        if (taskdeleted != null) {
            res.status(200).json({
                success: true,
                message: "Task deleted successfully",
                show:taskdeleted
            })
        } else {
            res.success(404).json({
                success: false,
                message: "No Task deleted try again"
            })

        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
module.exports = { addTask, getTasks, editTask, deleteTask }


