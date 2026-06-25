import mysql from "mysql2/promise";

const connectionUri = "mysql://u138_5EVnDRBt4k:ev%3D52zg2%2Bx9!N%40mwCRqyj9Q3@5.180.34.43:3306/s138_linecard";

let pool: mysql.Pool | null = null;
let isTableChecked = false;

export function getDbPool() {
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
