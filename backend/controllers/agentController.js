import Agent from '../models/Agent.js';
import bcrypt from 'bcryptjs';

export const addAgent = async (req, res) => {
    try {

        const { name, email, mobile, password } = req.body;

        // Check for duplicate email
        const existing = await Agent.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Agent with this email already exists.' });
        }

        const hashed = await bcrypt.hash(password, 10);
        const agent = new Agent({ name, email, mobile, password: hashed });
        await agent.save();

        res.status(201).json({ message: 'Agent created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getAgents = async (req, res) => {
    const agents = await Agent.find();
    res.json(agents);
};
