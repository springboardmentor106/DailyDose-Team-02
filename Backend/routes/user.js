import express from 'express';
import bcrypt from 'bcrypt';
import USER from '../models/userModel.js';

const user = express.Router()

// checking password strength using RegEx ->alteast "8 char long, 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special char"
function isStrongPassword(password) {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
}

user.post('/register', async (req, res) => {
    try {
        const { email, name, password, phoneNumber, dob, gender, userRole } = req.body;

        if (!email || !name || !password || !phoneNumber || !dob || !userRole) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        // Check if user's email already exists
        const existingUser = await USER.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // checking password strength
        if (!isStrongPassword(password)) {
            return res.status(400).json({ error: `alteast "8 char long, 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special char"` });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new USER({
            email,
            name,
            passwordHash: hashedPassword,
            phoneNumber,
            dob,
            gender,
            userRole
        });

        await newUser.save();
        res.status(201).json({ message: 'User saved successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Failed to save user' });
    }
});


user.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password' });
        }

        // Finding user by email
        const user = await USER.findOne({ email });

        // if user not found
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Matching the password
        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

        // passwords don't match
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login Failed' });
    }
});

export default user;