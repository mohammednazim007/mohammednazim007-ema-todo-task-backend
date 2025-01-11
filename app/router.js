const router = require("express").Router();
const userRouter = require("../controller/user/user.route");
const taskRouter = require("../controller/task-controller/task.route");
const { getCategories } = require("../controller/user/user.controller");
router.use(
  cors({
    origin: "*",
  })
);
router.use("/api/v1/tasks", userRouter);
router.use("/api/v1/users", taskRouter);

router.get("/health", (_request, response) => {
  return response.status(200).json({ message: "health route is ok" });
});

// Default route (root)
router.get("/", (_req, res) => {
  res.status(200).json({ message: "Welcome to the API!" });
});

module.exports = router;
