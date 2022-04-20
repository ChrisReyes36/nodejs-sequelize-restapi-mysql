import { request, response } from "express";

import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";

const ctrlProjects = {};

ctrlProjects.getProjects = async (req = request, res = response) => {
    try {
        const projects = await Project.findAll({
            attributes: ["id", "name", "priority", "description"],
            where: {
                state: true,
            },
        });

        res.status(200).json({
            ok: true,
            projects,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: "Error in the server",
            error: e.message,
        });
    }
};

ctrlProjects.createProject = async (req = request, res = response) => {
    try {
        const { name, priority, description } = req.body;

        let project = await Project.findOne({
            where: {
                name,
            },
        });

        if (project) {
            return res.status(400).json({
                ok: false,
                message: `The project ${name} already exists`,
            });
        }

        project = await Project.create({
            name,
            priority,
            description,
        });

        res.status(201).json({
            ok: true,
            message: "Project created successfully",
            project,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: "Error in the server",
            error: e.message,
        });
    }
};

ctrlProjects.getProject = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({
                ok: false,
                message: `The project with id ${id} does not exist`,
            });
        }

        res.status(200).json({
            ok: true,
            project,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: "Error in the server",
            error: e.message,
        });
    }
};

ctrlProjects.updateProject = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const { name, priority, description } = req.body;

        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({
                ok: false,
                message: `The project with id ${id} does not exist`,
            });
        }

        await project.update({
            name,
            priority,
            description,
        });

        res.status(200).json({
            ok: true,
            message: "Project updated successfully",
            project,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: "Error in the server",
            error: e.message,
        });
    }
};

ctrlProjects.deleteProject = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({
                ok: false,
                message: `The project with id ${id} does not exist`,
            });
        }

        //await project.destroy();

        await project.update({
            state: false,
        });

        res.status(200).json({
            ok: true,
            message: "Project deleted successfully",
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: "Error in the server",
            error: e.message,
        });
    }
};

ctrlProjects.getProjectTasks = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({
                ok: false,
                message: `The project with id ${id} does not exist`,
            });
        }

        const tasks = await Task.findAll({
            where: {
                projectId: id,
                state: true,
            },
        });

        res.status(200).json({
            ok: true,
            tasks,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: "Error in the server",
            error: e.message,
        });
    }
};

export default ctrlProjects;
