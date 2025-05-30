const express = require("express")
const { getTask, createTasks, taskStatus } = require("../controllers/taskController")
const router = express.Router()

router.get("/tasks", getTask)
router.post("/tasks", createTasks);
router.get("/tasks/status",taskStatus)

module.exports = router;