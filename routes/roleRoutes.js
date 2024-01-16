import express from 'express';
import { Role }from '../models/Role.js'; 

const router = express.Router();

// Get Role
router.get("/get-roles", async (req, res) => {
    try {
        const role = await Role.find();
        res.json(role);    
    } catch (error) {
        console.error(`ERROR in finding: ${error}`);
        res.status(500).json({ message: `Error in finding users: ${error.message}` });
    }
});

export default router;