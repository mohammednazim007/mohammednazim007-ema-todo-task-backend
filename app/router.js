const router = require("express").Router();
const userRouter = require("../controller/user/user.route");
const taskRouter = require("../controller/task-controller/task.route");

router.use("/tasks", userRouter);
router.use("/users", taskRouter);

router.get("/health", (_request, response) => {
  return response.status(200).json({ message: "health route is ok" });
});

// Default route (root)
router.get("/", (_req, res) => {
  res.status(200).json({ message: "Welcome to the API!" });
});

module.exports = router;
