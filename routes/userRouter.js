const userRouter = require("express").Router();
const upload = require('../middleware/multer')
const user = require("../controllers/userController");
const validate = require('../validator/userValidate/userValidate')
const { isUser, isAdmin, isClient, isAdminAndUser } = require('../middleware/authorization')

userRouter.post("/signup", user.signUp);
userRouter.post("/userlogin", user.userLogin);
userRouter.get("/alluserlist/:userRole?",isAdmin, user.allUsersList);
userRouter.get("/userbyname/:userName/:userRole?", isAdmin,user.getUserByName);
// In your user route
userRouter.get('/assignedprojects/:uid',  user.getUserAssignedProjects);

module.exports = userRouter;












// upload.single('profilePic'),