const express = require("express")
const { getTask, createTasks, taskStatus, viewTask, updatetask, deletetask, getinduvidualtask } = require("../controllers/taskController")
const authmiddileware = require("../middilewares/authmiddleware")
const router = express.Router()

router.get("/tasks", getTask)
router.get("/tasks/status", taskStatus)
router.get('/task/viewtask/:id', viewTask)
router.get("/task/user/individual", authmiddileware, getinduvidualtask)
router.post("/tasks", createTasks);
router.put("/task/updatetask/:id", updatetask)
router.delete("/task/deletetask/:id", deletetask)

module.exports = router;