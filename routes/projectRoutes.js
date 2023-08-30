const express = require('express')
const router = express.Router()
const project = require('../controllers/projectController')
const  upload  = require('../middleware/multer')
const { isUser, isAdmin, isClient } = require('../middleware/authorization')

router.post('/addproject',upload.single('project_image') , isClient, project.addProject)
router.get('/allproject', project.getProjects)
router.get('/projectsvianame/:project_name', project.getProjectsbyName)
router.patch('/updateproject/:_id', isClient, project.updateProject)
router.delete('/deleteproject/:_id',isAdmin, project.deleteProject)


module.exports = router;