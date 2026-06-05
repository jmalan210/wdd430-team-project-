import { pool } from "@/lib/db";

export async function createUser(email: string, passwordHash: string) {
    return pool.query(
        `INSERT INTO users (email, password_hash, role)
        VALUES ($1, $2, 'user')`, 
        [email, passwordHash]
    );
}

export async function getUserByEmail(email: string) {
   const users = await pool.query(
        `select * from users where email = $1`, [email]
    );
    return users.rows[0];
} 