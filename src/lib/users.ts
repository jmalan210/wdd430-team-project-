import { pool } from "@/lib/db";

export async function createUser(firstName: string, lastName: string, email: string, passwordHash: string) {
    return pool.query(
        `INSERT INTO users (firstname, lastname, email, password_hash, role)
        VALUES ($1, $2, $3, $4, 'user')`, 
        [firstName, lastName, email, passwordHash]
    );
}

export async function getUserByEmail(email: string) {
   const users = await pool.query(
        `select * from users where email = $1`, [email]
    );
    return users.rows[0];
} 