const express = require("express");
const app = express();
const { connectDB } = require("./db");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("./controllers/taskController");
require("dotenv").config(); // Agregamos esta línea para cargar las variables de .env

app.use(express.json());

const port = 3000;

// CRUD
app.get("/tasks", getTasks);
app.post("/create", createTask);
app.put("/update/:id", updateTask);
app.delete("/delete/:id", deleteTask);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
