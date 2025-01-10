const { connectionDB } = require("../../db/connectionDB");
const { ObjectId } = require("mongodb"); // Import ObjectId to use it for comparison.

// Create a new task
const dailyTask = async (req, res) => {
  const { amount, purpose, category } = req.body;

  const db = connectionDB();
  const tasksCollection = db.collection("tasks");
  const usersCollection = db.collection("users_daily_task");

  try {
    // Fetch the category details from tasksCollection
    const singleCategory = await tasksCollection.findOne({
      category,
    });

    if (!singleCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const totalLimit = singleCategory.limit;

    // Calculate the total amount for the given category in usersCollection
    const totalAmountForCategory = await usersCollection
      .aggregate([
        { $match: { category } }, // Match documents by categoryId
        { $group: { _id: null, totalAmount: { $sum: "$amount" } } }, // Sum the "amount" field
      ])
      .toArray();

    const currentTotalAmount =
      totalAmountForCategory[0]?.totalAmount + amount || 0;

    // Check if the new task would exceed the limit
    if (currentTotalAmount > totalLimit) {
      return res.status(400).json({
        message: `Total limit exceeded ( ${totalLimit || 0} )`,
        currentTotalAmount,
        totalLimit,
      });
    }

    // Insert the new task if within the limit
    const task = await usersCollection.insertOne({
      amount,
      purpose,
      category,
      createdAt: new Date().toISOString().split("T")[0], // Store only the date
      categoryId: singleCategory._id,
    });

    res.status(201).json({
      message: "Task created successfully",
      taskId: task.insertedId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// filter the tasks by category
const filterTasksById = async (req, res) => {
  const { id } = req.params; // Extract the `id` parameter from the request.
  const db = connectionDB();
  const tasksCollection = db.collection("users_daily_task");

  try {
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Convert the id to an ObjectId.
    const tasks = await tasksCollection
      .find({ categoryId: new ObjectId(id) }) // Ensure the query uses an ObjectId.
      .toArray();

    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No tasks found for this category" });
    }

    // sum total price of all tasks
    const totalPrice = await tasksCollection
      .aggregate([
        {
          $match: { categoryId: new ObjectId(id) },
        },
        {
          $group: {
            _id: null,
            totalPrice: { $sum: "$amount" },
          },
        },
      ])
      .toArray();

    res.status(200).json({
      message: "Tasks fetched successfully",
      totalPrice: totalPrice[0].totalPrice,
      tasks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// delete task by id
const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate that the provided ID is a valid ObjectId & check if the document exists
    if (!id) {
      res.status(400).json({ message: "Missing required parameter" });
    }

    // Validate that the provided ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid ID format" });
    }

    // Database connection
    const db = connectionDB();
    const tasksCollection = db.collection("users_daily_task");

    // database operation
    const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { dailyTask, filterTasksById, deleteTaskById };
