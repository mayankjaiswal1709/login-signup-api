const express = require("express");
const ProjectSchema = require("../models/projectSchema");
const fs = require("fs")
const uploads = require('../middleware/multer')

// FOR VENDOR ALL API'S 
// add Project api
const addProject = async (req, res) => {
    try {
        const newProject = new ProjectSchema(req.body);
        if (newProject != null) {
            newProject.Project_image = `/uploads/${(req.file.filename)}`;
            await newProject.save();
            res.status(200).json({
                success: true,
                message: "Project added successfully"
            })
        } else {
            fs.unlinkSync(req.file.path)
            res.status(404).json({
                success: false,
                message: "no such data added"
            })
        }
    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};

// get all  Project 
const getProjects = async (req, res) => {
    try {
        const allProject = await ProjectSchema.find(req.body);
        if (allProject) {
            res.status(200).json({
                success: true,
                message: "all Project list below",
                ProjectList: allProject
            })
        } else {
            res.status(404)({
                success: false,
                message: "no Project found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


// get all  Project via name
const getProjectsbyName = async (req, res) => {
    try {
        const { Project_name } = req.params
        const allProject = await ProjectSchema.find({ Project_name });
        if (allProject) {
            res.status(200).json({
                success: true,
                message: "all Project list below",
                ProjectList: allProject
            })
        } else {
            res.status(404)({
                success: false,
                message: "no Project found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


// update Project
const updateProject = async (req, res) => {
    try {
        const { _id } = req.params
        const upgradeProject = await ProjectSchema.findByIdAndUpdate({ _id }, req.body);
        if (upgradeProject != null) {
            await upgradeProject.save();
            return res.status(200).json({
                success: true,
                message: "Project details updated successfully"
            })

        } else {
            res.status(404).json({
                success: false,
                message: "no such Project"
            })

        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }

}

// delete Project 
const deleteProject = async (req, res) => {
    const { _id } = req.params
    const selectdeleteProject = await ProjectSchema.findByIdAndDelete({ _id }, req.body)
    try {
        if (selectdeleteProject != null) {
            res.status(200).json({
                success: true,
                message: "your Project deleted succrssfully"
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Project not deleted try again"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }

}
module.exports = { addProject, getProjects, getProjectsbyName, updateProject, deleteProject };
