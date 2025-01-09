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

    const currentTotalAmount = totalAmountForCategory[0]?.totalAmount || 0;

    // Check if the new task would exceed the limit
    if (currentTotalAmount + amount > totalLimit) {
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

    console.log("single category", singleCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// filter the tasks by category
// const filterTasksByCategory = async (req, res) => {
//   const { categoryId } = req.query;
//   const { id } = req.params;
//   const db = connectionDB();
//   const tasksCollection = db.collection("users_daily_task");

//   try {
//     const tasks = await tasksCollection.find({ categoryId: id }).toArray();

//     if (!tasks) {
//       return res
//         .status(404)
//         .json({ message: "No tasks found for this category" });
//     }

//     console.log("tasks", tasks);
//     console.log("categoryId", id);

//     res.status(200).json({ message: "Tasks fetched successfully", tasks });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

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

    console.log("tasks", tasks);
    console.log("categoryId", id);

    res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { dailyTask, filterTasksById };
