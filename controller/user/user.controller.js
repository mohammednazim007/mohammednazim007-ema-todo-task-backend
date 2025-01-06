const { connectionDB } = require("../../db/connectionDB");

const addCategory = async (request, response) => {
  try {
    const db = connectionDB();
    const tasksCollection = db.collection("tasks");
    const result = await tasksCollection.insertOne(request.body);

    response.status(201).send({ message: "Task added successfully", result });
  } catch (err) {
    console.error("Error adding task:", err);
    response.status(500).send("Server Error");
  }
};

module.exports = { addCategory };
