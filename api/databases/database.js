// Imports
import mysql from 'mysql2';
import dotenv from "dotenv";

// Configs
dotenv.config();

// Création de la relation BDD - BACKEND
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();
    
export default pool;