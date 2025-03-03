import pool from "../db.js";
import { getToken, verifyToken } from "../middleware/jwt.js";

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

export const createTask = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = verifyToken(token);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user_id = user.id;
        const { task } = req.body;

        if (!task) {
            return res.status(400).json({ message: 'Task is required' });
        }

        const response = await pool.query('INSERT INTO tasks (user_id, task) VALUES ($1, $2) RETURNING *', [user_id, task]);
        if (response.rows.length > 0) {
            res.status(201).json({ message: 'Task created successfully', task: response.rows[0] });
        } else {
            res.status(500).json({ message: 'Task creation failed' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getTasks = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = verifyToken(token);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user_id = user.id;

        const response = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [user_id]);
        if (response.rows.length > 0) {
            res.status(200).json({ message: 'Tasks retrieved successfully', tasks: response.rows });
        } else {
            res.status(404).json({ message: 'No tasks found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}