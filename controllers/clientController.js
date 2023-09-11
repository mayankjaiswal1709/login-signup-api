const express = require('express')
const clientSchema = require('../models/clientSchema')
// const ProjectSchema = require("../models/projectSchema");
// const uploads = require('../middleware/multer')
const fs = require('fs')

// add Task api
const addClient = async (req, res) => {
    try {
        const clientData = new clientSchema(req.body);
        if (clientData != null) {
            // clientData.task_image = `/uploads/${(req.file.filename)}`;
            // clientData.userId = req.userId;
            // clientData.projectId = req.params.pid;
            await clientData.save();
            res.status(200).json({
                success: true,
                message: "client Added Successfully",
                Task: clientData,
            })
        } else {
            fs.unlinkSync(req.file.path)
            res.status(404).json({
                success: false,
                message: "Client not added try again !"

            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: `Error occur ${error.stack}`,
        });
    }
};

// see  all clients
const getAllClients = async (req, res) => {
    try {
        const allClientList = await clientSchema.find()
        if (allClientList != null) {
            return res.status(200).json({
                sucess: true,
                message: "your all Client list below",
                TaskList: allClientList
            })

        } else {
            res.status(404).json({
                success: false,
                message: "No Client Found"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error occurs${error.message}`
        })
    }
}
module.exports = { addClient ,getAllClients}

