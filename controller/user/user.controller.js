const addTask = (_request, response) => {
  return response.status(200).json({ message: "user controller is ok" });
};

module.exports = { addTask };
