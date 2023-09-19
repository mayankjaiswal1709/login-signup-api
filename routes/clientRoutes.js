const clientRouter = require("express").Router();
// const upload = require('../middleware/multer')
const client = require("../controllers/clientController");
const { isUser, isAdmin, isClient, isAdminAndUser } = require('../middleware/authorization')

clientRouter.post("/addclient/:userRole?",isAdmin, client.addClient);
clientRouter.get("/allclientlist/:userRole?",isAdmin, client.getAllClients);
clientRouter.get("/clients/:emailId/:userRole?", isClient, client.getClientProjects);
module.exports = clientRouter;
