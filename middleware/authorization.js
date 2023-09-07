const JWT = require('jsonwebtoken')
const User =require('../models/userSchema')

const isUser = async (req, res, next) => {
    if (req.body.userRole === "user") {
        next();
    } else {
        return res.status(401).json({
            status: false,
            message: "You are not an authorized person as a user"
        });
    }
};

const isAdmin = async (req, res, next) => {
    if (req.body.userRole === "admin") {
        next();
    } else {
        return res.status(401).json({
            status: false,
            message: "You are not an authorized person as an admin"
        });
    }
};

const isAdminAndUser = async (req, res, next) => {
    if (req.body.userRole === "admin" || req.body.userRole === "user") {
        next();
    } else {
        return res.status(401).json({
            status: false,
            message: "You are not an authorized person"
        });
    }
};


const isClient = async (req, res, next) => {
    if (req.body.userRole === "client" || req.body.userRole === "admin") {
        next();
    } else {
        return res.status(401).json({
            status: false,
            message: "You are not an authorized person as a client or admin"
        });
    }
};

module.exports = { isUser, isAdmin, isClient,isAdminAndUser };
