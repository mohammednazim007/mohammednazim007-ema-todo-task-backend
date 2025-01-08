const { ObjectId } = require("mongodb");
const { connectionDB } = require("../../db/connectionDB");

// get all categories
const getCategories = async (request, response) => {
  try {
    const db = connectionDB();
    const tasksCollection = db.collection("tasks");

    const result = await tasksCollection.find({}).toArray();

    response
      .status(200)
      .send({ message: "Categories retrieved successfully", result });
  } catch (err) {
    console.error("Error retrieving categories:", err);
    response.status(500).send("Server Error");
  }
};

const addCategory = async (request, response) => {
  try {
    const { limit, category } = request.body;

    // Validate parameters
    if (
      typeof limit !== "number" ||
      typeof category !== "string" ||
      category.trim() === ""
    ) {
      response.status(400).send("Invalid parameters");
      return;
    }

    // Database connection
    const db = connectionDB();
    const tasksCollection = db.collection("tasks");

    // Check if category already exists
    const categoryExists = await tasksCollection.findOne({ category });
    if (categoryExists) {
      response.status(400).send({ message: "Category already exists" });
      return;
    }

    // Format the current time
    const currentTime = new Date();
    const formattedDate = currentTime.toISOString().split("T")[0];

    // Create a new task
    const newTask = { limit, category, createdAt: formattedDate };
    const result = await tasksCollection.insertOne(newTask);

    response.status(201).send({ message: "Task added successfully", result });
  } catch (err) {
    console.error("Error adding task:", err);
    response.status(500).send({ message: "Server Error", error: err.message });
  }
};

// delete category by id
const deleteCategory = async (request, response) => {
  try {
    const { id } = request.params;

    // Validate that the provided ID is a valid ObjectId & check if the document exists
    if (!id) {
      response.status(400).send({ message: "Missing required parameter" });
    }

    if (!ObjectId.isValid(id)) {
      return response.status(400).send({ message: "Invalid ID format" });
    }

    const db = connectionDB();
    const tasksCollection = db.collection("tasks");
    const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });

    response.status(200).send({ message: "Task deleted successfully", result });
  } catch (err) {
    console.error("Error deleting task:", err);
    response.status(500).send("Server Error");
  }
};

// update category by id
const updateCategory = async (request, response) => {
  try {
    const { id } = request.params;
    const { category, limit } = request.body;

    if (!id) {
      response.status(400).send({ message: "Missing required parameter" });
      return;
    }

    // Validate that the provided ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return response.status(400).send({ message: "Invalid ID format" });
    }

    // database operation
    const db = connectionDB();
    const tasksCollection = db.collection("tasks");

    const result = await tasksCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { category, limit } }
    );

    // Check if the document was modified
    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Task not found" });
    }

    response.status(200).send({ message: "Task updated successfully", result });
  } catch (err) {
    console.error("Error updating task:", err);
    response.status(500).send("Server Error");
  }
};
module.exports = { getCategories, addCategory, deleteCategory, updateCategory };
