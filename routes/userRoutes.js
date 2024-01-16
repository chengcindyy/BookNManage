import express from 'express';
import { User } from '../models/User.js';
import { Role } from '../models/Role.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// Add User
router.post("/signup-user", async (req,res)=>{

    //process the request body
    const {firstName, lastName, username, password, phone} = req.body;

    const newUser = new User({firstName, lastName, username, password, phone})

    // Check if exist
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        res.status(409).json({ message: "Registration error" });
        return;
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(username)) {
        res.status(400).json({ message: "Invalid email address." });
        return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: "Password must be at least 6 characters long and include at least one number and one special character." });
        return;
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        res.status(400).json({ message: "Invalid phone number." });
        return;
    }

    try {
        // Search role
        const userRole = await Role.findOne({ name: 'user' });
        if (!userRole) {
            return res.status(500).json({ message: "Default user role not found." });
        }

        const newUser = new User({
            firstName,
            lastName,
            username,
            password, 
            phone,
            roles: [userRole.name]
        });

        // Save new user
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully"});
    } catch (err) {
        console.error("Error in user registration:", err);
        res.status(500).json({ message: "Error in user registration" });
    }
});

// Login User
router.post("/login-user", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username: username }).select('+password');

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                console.log("Login Successful");                
                res.json({ username: user.username, _id: user._id, roles: user.roles });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Error logging in user" });
    }
});

// Get User data
router.get("/get-user", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);    
    } catch (error) {
        console.error(`ERROR in finding: ${error}`);
        res.status(500).json({ message: `Error in finding users: ${error.message}` });
    }
});

// Update user
router.put("/update-user/:id", async (req, res) => {
    const { firstName, lastName, username, phone, roles } = req.body;
    const userId = req.params.id;

    try {
        const updateObject = { firstName, lastName, username, phone, roles };

        const updatedUser = await User.findByIdAndUpdate(userId, updateObject, { new: true });
        if (updatedUser) {
            res.send(updatedUser);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(`ERROR in updating: ${error}`);
        res.status(500).send(`ERROR in updating: ${error}`);
    }
});

// Delete user
router.delete("/delete-user/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(200).send("User deleted");
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(`ERROR in deleting: ${error}`);
        res.status(500).send(`ERROR in deleting: ${error}`);
    }
});


export default router;