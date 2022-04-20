import { DataTypes } from "sequelize";
import db from "../database/connection.js";
import { Task } from "./Task.js";

export const Project = db.define(
    "projects",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        timestamps: false,
    }
);

Project.hasMany(Task, { foreignKey: "projectId", sourceKey: "id" });
Task.belongsTo(Project, { foreignKey: "projectId", targetKey: "id" });
