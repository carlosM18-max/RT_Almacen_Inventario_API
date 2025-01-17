import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: true,
    timezone: process.env.DB_TIMEZONE,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    },
    define: {
        engine: 'InnoDB',
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

export default db;