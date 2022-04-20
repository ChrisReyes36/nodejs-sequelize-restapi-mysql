import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import config from "../configuration/configuration.js";
import db from "../database/connection.js";
import projectsRoutes from "../routes/projects.routes.js"
import tasksRoutes from "../routes/tasks.routes.js"
// import "../models/Project.js";
// import "../models/Task.js";

class Server {
    constructor() {
        this.app = express();
        // setings
        this.config();
        // Database connection
        this.dbConnection();
        // middlewares
        this.middlewares();
        // paths
        this.paths = {
            projects: "/api/projects",
            tasks: "/api/tasks"
        };
        // routes
        this.routes();
    }

    async dbConnection() {
        // Database connection
        try {
            await db.authenticate();
            // await db.sync({ force: true });
            console.log("Connection has been established successfully.");
        } catch (error) {
            throw new Error(error);
        }
    }

    config() {
        // settings
        this.app.set("port", config.port);
    }

    middlewares() {
        // view server requests
        this.app.use(morgan("dev"));
        // allow cross-origin requests
        this.app.use(cors());
        // parse application/json
        this.app.use(bodyParser.json());
        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    routes() {
        // routes
        this.app.use(this.paths.projects, projectsRoutes);
        this.app.use(this.paths.tasks, tasksRoutes);
    }

    start() {
        // start server
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server running on port ${this.app.get("port")}`);
        });
    }
}

export default Server;
