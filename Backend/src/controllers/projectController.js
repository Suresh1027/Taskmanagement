const Project = require('../models/projectModel');
const mongoose = require('mongoose');
const { findByIdAndUpdate } = require('../models/taskModel');

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('team', 'username');
        res.status(200).json({ message: "Projects fetched successfully", projects });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.createProject = async (req, res) => {
    try {
        const { name, description, budget, team, status, startDate, endDate } = req.body;

        if (!name || !description || !budget || !team || !status || !startDate || !endDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const project = new Project({
            name,
            description,
            budget,
            team,
            status,
            startDate,
            endDate,
        });

        await project.save();

        res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.Updateproject = async (req, res) => {
    try {
        const Updateproject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(Updateproject)

    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

exports.Deleteproject = async (req, res) => {
    try {
        const deleteproject = await Project.findByIdAndDelete(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(deleteproject)
    }
    catch (error) {
        res.status(500).json({ message: "server error" })
    }
}


exports.getStatus = async (req, res) => {
    try {
        const enumstatus = ['not started', 'in progress', 'completed'];
        res.status(200).json({ message: "Status fetched successfully", enumstatus });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.singleProject = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid project ID" });
        }

        const project = await Project.findById(id).populate('team', 'username');

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project fetched successfully", project });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.getIndividualproject = async (req, res) => {
    const { id, userRole } = req.user;
    console.log({ userRole });

    try {
        const project = userRole === "admin"
            ? await Project.find().populate('team', 'username')
            : await Project.find({ team: id }).populate('team', 'username')

        res.json(project)

    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message })
    }
}
