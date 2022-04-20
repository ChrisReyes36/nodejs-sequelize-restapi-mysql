import { request, response } from "express";

import { Task } from "../models/Task.js";

const ctrlTasks = {};

ctrlTasks.getTasks = async (req = request, res = response) => {
    try {
        const tasks = await Task.findAll({
            attributes: ["id", "projectId", "name", "done"],
            order: [["id", "ASC"]],
            where: {
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

ctrlTasks.createTask = async (req = request, res = response) => {
    try {
        const { projectId, name } = req.body;

        let task = await Task.findOne({
            where: {
                projectId,
                name,
            },
        });

        if (task) {
            return res.status(400).json({
                ok: false,
                message: `Task with name ${name} already exists`,
            });
        }

        task = await Task.create({
            projectId,
            name,
        });

        res.status(201).json({
            ok: true,
            message: "Task created successfully",
            task,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: "Error in the server",
            error: e.message,
        });
    }
};

ctrlTasks.getTask = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({
                ok: false,
                message: `The task with id ${id} does not exist`,
            });
        }

        res.status(200).json({
            ok: true,
            task,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: "Error in the server",
            error: e.message,
        });
    }
};

ctrlTasks.updateTask = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const { projectId, name, done } = req.body;

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(400).json({
                ok: false,
                message: `Task with id ${id} does not exists`,
            });
        }

        await task.update({
            projectId,
            name,
            done,
        });

        res.status(200).json({
            ok: true,
            message: "Task updated successfully",
            task,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: "Error in the server",
            error: e.message,
        });
    }
};

ctrlTasks.deleteTask = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        let task = await Task.findByPk(id);

        if (!task) {
            return res.status(400).json({
                ok: false,
                message: `Task with id ${id} does not exists`,
            });
        }

        await task.update({
            state: false,
        });

        res.status(200).json({
            ok: true,
            message: "Task deleted successfully",
            task,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            message: "Error in the server",
            error: e.message,
        });
    }
};

export default ctrlTasks;
