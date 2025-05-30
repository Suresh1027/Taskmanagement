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

exports.taskStatus = async (req, res) => {
    try {
        const status = ['pending', 'in progress', 'completed']
        return res.status(200).json({ message: 'Status fetched successfully', status })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}
