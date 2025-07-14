const { default: mongoose } = require('mongoose');
const Task = require('../models/taskModel');

exports.getTask = async (req, res) => {
    try {
        const tasks = await Task.find().populate('project', 'name').populate('assignedTo', 'username')
        if (!tasks) {
            return res.status(404).json({ message: 'No tasks found' })
        }
        return res.status(200).json({ message: 'Tasks fetched successfully', tasks })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
exports.createTasks = async (req, res) => {
    try {
        const { title, description, status, assignedTo, project, dueDate } = req.body
        if (!title || !description || !status || !assignedTo || !project || !dueDate) {
            return res.status(400).json({ message: 'Please fill all the fields' })
        }


        const task = new Task({
            title,
            description,
            status,
            assignedTo,
            project,
            dueDate
        });
        await task.save()
        return res.status(201).json({ message: 'Task created successfully', task })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}



exports.viewTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "invalid Task id" })
        }

        const task = await Task.findById(id).populate('project', 'name').populate('assignedTo', 'username')

        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }
        res.status(200).json({ message: "Task fetch successfully", task })

    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message })
    }
}

exports.updatetask = async (req, res) => {
    try {
        const Updatetask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(Updatetask)
    }
    catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

exports.deletetask = async (req, res) => {
    try {
        const Deletetask = await Task.findByIdAndDelete(
            req.params.id,
            req.body,
            { new: true }
        )
    }
    catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

exports.taskStatus = async (req, res) => {
    try {
        const status = ['pending', 'in progress', 'completed']
        return res.status(200).json({ message: 'Status fetched successfully', status })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

exports.getinduvidualtask = async (req, res) => {
    const { id, userRole } = req.user;
    console.log({ userRole })
    try {

        const task = userRole === "admin"
            ? await Task.find().populate('project', 'name').populate('assignedTo', 'username')
            : await Task.find({ assignedTo: id }).populate('project', 'name').populate('assignedTo', 'username')

        res.json(task)
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message })
    }
}