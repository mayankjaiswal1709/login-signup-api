const express = require('express')
const clientSchema = require('../models/clientSchema')
// const ProjectSchema = require("../models/projectSchema");
// const uploads = require('../middleware/multer')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const  transporter  = require('../services/emailService')

// add Task api
const addClient = async (req, res) => {
    const clientData = new clientSchema(req.body);
    try {
        const isClientExists = await clientSchema.findOne({
            clientEmail: req.body.clientEmail,
          });
        if (isClientExists) {
            res.status(404).json({
                success: false,
                message: "Client  is already existed with this email ! try again with another email"

            })
        } else {

              const signuplink = `http://localhost:8000/user/signup`
              const clientName = req.body.clientName
              await transporter.sendMail({
                  from: process.env.Email,
                  to: req.body.clientEmail,
                  subject: "Signup Request from IONINKS",
                  html: `<p> Dear ${clientName} you have been onboarded to Ioninks portal please make sure to Signup using the below link</p> 
                  <a href="${signuplink}">Click on the link to Signup to IONINKS</a>`,
              })
              await clientData.save();
              res.status(201).json({
                  success: true,
                  message: "Client Added Successfully and mail sended to client",
                  Task: clientData,
              })
        }
    } catch (error) {
        res.status(500).json({
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

