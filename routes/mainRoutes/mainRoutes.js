const router = require("express").Router();
const userRouter = require("../userRouter");
const projectRoutes = require("../projectRoutes");
const taskRoutes = require("../taskRoute");


router.use("/user", userRouter);
router.use("/project", projectRoutes);
router.use("/task", taskRoutes);


module.exports = router;
