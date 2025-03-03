import pool from "../db.js";
import { getToken } from "../middleware/jwt.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const response = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
        if (response.rows.length > 0) {
            const user = response.rows[0];
            const token = getToken(user);
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ message: 'Login successful', token });
        
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: 'Username, password, and email are required' });
        }

        const response = await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *', [username, password, email]);
        if (response.rows.length > 0) {
            res.status(201).json({ message: 'User created successfully', user: response.rows[0] });
        } else {
            res.status(500).json({ message: 'User creation failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}