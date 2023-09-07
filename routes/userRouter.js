const userRouter = require("express").Router();
const upload = require('../middleware/multer')
const user = require("../controllers/userController");
const validate = require('../validator/userValidate/userValidate')
const { isUser, isAdmin, isClient, isAdminAndUser } = require('../middleware/authorization')

userRouter.post("/signup", upload.single('profilePic'), validate.singUpValidation, user.signUp);
userRouter.post("/userlogin", user.userLogin);
userRouter.get("/alluserlist",isAdmin, user.allUsersList);
userRouter.get("/userbyname/:userName", isAdmin,user.getUserByName);
// In your user route
userRouter.get('/assignedprojects', isUser, user.getUserAssignedProjects);

module.exports = userRouter;
