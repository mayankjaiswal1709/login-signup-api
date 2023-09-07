const task = require('../controllers/taskControllers')
const express = require('express')
const  upload  = require('../middleware/multer')
const router = express.Router()
const { isUser, isAdmin, isClient } = require('../middleware/authorization')

router.post('/addtask/:pid', upload.single('task_image'), task.addTask)
router.get('/getalltask', task.getTasks)
router.get('/getassignedtasktoprject', task.getTaskAssignedProjects)
router.patch('/updatetask/:_id', isAdmin, task.editTask)
router.delete('/deltetask/:_id', isAdmin, task.deleteTask)

module.exports = router
