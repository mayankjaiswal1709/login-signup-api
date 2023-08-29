const userRouter = require("express").Router();
const upload = require('../middleware/multer')
const user = require("../controllers/userController");
const validate = require('../validator/userValidate/userValidate')

userRouter.post("/signup", upload.single('profilePic'), validate.singUpValidation, user.signUp);
userRouter.post("/userlogin", user.userLogin);

module.exports = userRouter;
