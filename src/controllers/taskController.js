const { ObjectId } = require("mongodb");
const { client } = require("../db");

// CREATE - Agregar una nueva tarea
async function createTask(req, res) {
  const task = req.body;

  try {
    await client.connect();
    const db = client.db("exercise-crud");
    const collection = db.collection("tasks");

    const newTask = await collection.insertOne(task);

    client.close();

    res.status(201).send("Task created successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error creating task");
  }
}

// READ - Obtener todas las tareas
async function getTasks(req, res) {
  try {
    await client.connect();
    const db = client.db("exercise-crud");
    const collection = db.collection("tasks");

    const tasks = await collection.find().toArray();

    client.close();

    res.send(tasks);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error fetching tasks");
  }
}

// UPDATE - Actualizar una tarea por su ID
async function updateTask(req, res) {
  const id = req.params.id;
  const body = req.body;

  try {
    await client.connect();
    const db = client.db("exercise-crud");
    const collection = db.collection("tasks");

    const updateTask = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    client.close();

    if (updateTask.modifiedCount > 0) {
      res.status(200).send("Task updated successfully");
    } else {
      res.status(404).send("Task not found or an error occurred");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error updating task");
  }
}

// DELETE - Eliminar una tarea por su ID
async function deleteTask(req, res) {
  const id = req.params.id;
  try {
    await client.connect();
    const db = client.db("exercise-crud");
    const collection = db.collection("tasks");

    const deleteTask = await collection.deleteOne({ _id: new ObjectId(id) });

    client.close();

    if (deleteTask.deletedCount > 0) {
      res.status(200).send("Task deleted successfully");
    } else {
      res.status(404).send("Task not found or an error occurred");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error deleting task");
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
