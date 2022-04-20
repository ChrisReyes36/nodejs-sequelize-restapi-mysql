import dotenv from "dotenv";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

const config = {
    // API server port
    port: process.env.PORT || 3000,
    userDB: process.env.USER_DB,
    passwordDB: process.env.PASSWORD_DB,
    hostDB: process.env.HOST_DB,
    database: process.env.DATABASE,
    portDB: process.env.PORT_DB,
};

export default config;
