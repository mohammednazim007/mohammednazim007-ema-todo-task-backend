const { connectionDB } = require("../../db/connectionDB");

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

    const currentTotalAmount = totalAmountForCategory[0]?.totalAmount || 0;

    // Check if the new task would exceed the limit
    if (currentTotalAmount + amount > totalLimit) {
      return res.status(400).json({
        message: "Cannot add task, total limit exceeded",
        currentTotalAmount,
        totalLimit,
      });
    }

    // Insert the new task if within the limit
    const task = await usersCollection.insertOne({
      amount,
      purpose,
      categoryId,
      createdAt: new Date().toISOString().split("T")[0], // Store only the date
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

module.exports = { dailyTask };
