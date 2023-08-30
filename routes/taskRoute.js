const task = require('../controllers/taskControllers')
const express = require('express')
const  upload  = require('../middleware/multer')
const router = express.Router()
const { isUser, isAdmin, isVendor } = require('../middleware/authorization')

router.post('/addtask', upload.single('task_image'), task.addTask)
router.get('/getalltask', task.getTasks)
router.patch('/updatetask/:_id', task.editTask)
router.delete('/deltetask/:_id', isAdmin, task.deleteTask)

module.exports = router
