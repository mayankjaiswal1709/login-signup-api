const clientRouter = require("express").Router();
// const upload = require('../middleware/multer')
const client = require("../controllers/clientController");
// const validate = require('../validator/userValidate/userValidate')
const { isUser, isAdmin, isClient, isAdminAndUser } = require('../middleware/authorization')

clientRouter.post("/addclient/:userRole?",isAdmin, client.addClient);
clientRouter.get("/allclientlist/:userRole?",isAdmin, client.getAllClients);
// userRouter.get("/userbyname/:userName/:userRole?", isAdmin,user.getUserByName);
// In your user route
// userRouter.get('/assignedprojects/:uid',  user.getUserAssignedProjects);

module.exports = clientRouter;
