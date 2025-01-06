const router = require("express").Router();
const userRouter = require("../controller/user/user.route");

router.use("/api/v1/tasks", userRouter);

router.get("/health", (_request, response) => {
  return response.status(200).json({ message: "health route is ok" });
});

module.exports = router;
