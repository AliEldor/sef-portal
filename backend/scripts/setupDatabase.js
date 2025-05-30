import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function createUser() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'se_factory_portal'
    });

    console.log('Connected to database');

    
    const plainPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    await connection.execute(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      ['admin@sefactory.com', hashedPassword, 'Admin User']
    );


  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
    } else {
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

createUser();