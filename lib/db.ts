import mysql from "mysql2/promise";

const connectionUri = process.env.DATABASE_URL;

let pool: mysql.Pool | null = null;
let isTableChecked = false;

export function getDbPool() {
  if (!connectionUri) {
    throw new Error("DATABASE_URL environment variable is missing!");
  }
  if (!pool) {
    pool = mysql.createPool({
      uri: connectionUri,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}

export async function ensureUsersTable(db: mysql.Pool) {
  if (isTableChecked) return;

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(100) NOT NULL,
      lastName VARCHAR(100) NOT NULL,
      country VARCHAR(100) NOT NULL,
      email VARCHAR(191) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  isTableChecked = true;
}
