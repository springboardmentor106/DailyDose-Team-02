import Caretaker from '../models/caretakerModel.js';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';


export const caretakerRegistration = async (req, res) => {
    try {
        const { firstname, lastname, email, gender, age, password, password_confirm } = req.body;

        if (!(firstname && lastname && email && gender && age && password && password_confirm)) {
            return res.status(400).json({ status: "failed", message: "All fields are required" });
        }

        if (password !== password_confirm) {
            return res.status(400).json({ status: "failed", message: "Password and Confirm password do not match" });
        }

        const existingCaretaker = await Caretaker.findOne({ email });
        if (existingCaretaker) {
            return res.status(400).json({ status: "failed", message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newCaretaker = new Caretaker({
            firstname,
            lastname,
            email,
            gender,
            age,
            password: hashPassword
        });

        await newCaretaker.save();
        return res.status(201).json({ status: "success", message: "Registered successfully" });
    } catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({ status: "failed", message: "Unable to register" });
    }
};

export const caretakerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json({ status: "failed", message: "All fields are required" });
        }

        const caretaker = await Caretaker.findOne({ email });
        if (!caretaker) {
            return res.status(400).json({ status: "failed", message: "Email not registered" });
        }

        const isMatch = await bcrypt.compare(password, caretaker.password);
        if (!isMatch) {
            return res.status(401).json({ status: "failed", message: "Invalid email or password" });
        }

        return res.status(200).json({ status: "success", message: "Login successful" });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ status: "failed", message: "Unable to login" });
    }
};


export const getAllUser = async (req, res) => {
    try {
        if (req.role !== 'caretaker') {
            return res.status(403).json({ status: "failed", message: "Only caretakers can access this endpoint." });
        }

        // Find all user's uuid in the database
        const users = await User.find({}, 'uuid'); // Only get 'uuid' field

        // Extracting user UUIDs from the retrieved users
        const userIds = users.map(user => user.uuid);

        return res.status(200).json({ status: "success", userIds });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ status: "error", message: "Internal server error." });
    }
}


export const assignUser = async (req, res) => {
    try {
        if (req.role !== 'caretaker') {
            return res.status(403).json({ status: "failed", message: "Only caretakers can assign users." });
        }

        const caretakerId = req.userId;

        const { userIds } = req.body;

        // Finding caretaker by ID
        const caretaker = await Caretaker.findById(caretakerId);
        if (!caretaker) {
            return res.status(404).json({ status: "failed", message: "Caretaker not found." });
        }

        // Looping through user IDs and assigning them to caretaker
        for (const userId of userIds) {
            const user = await User.findById(userId);
            if (!user) {
                console.warn(`User with ID ${userId} not found.`);
                continue;
            }

            caretaker.assignedSeniors.push(userId);
        }

        await caretaker.save();

        return res.status(200).json({ status: "success", message: "Users assigned successfully." });
    } catch (error) {
        console.error("Error assigning users to caretaker:", error);
        return res.status(500).json({ status: "error", message: "Internal server error." });
    }

};


export const createUserGoal = async (req, res) => {
    try {
        if (req.role !== 'caretaker') {
            return res.status(403).json({ status: "failed", message: "Only caretakers can create goals for users." });
        }

        const { uuid, title, description, targetDate, dayFrequency } = req.body;

        // Find user by uuid - given by caretaker
        const user = await User.findById(uuid);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found." });
        }

        const newGoal = new Goal({
            title,
            description,
            targetDate,
            dayFrequency,
        });

        await newGoal.save();

        user.goals.push(newGoal._id);
        await user.save();

        return res.status(201).json({ status: "success", message: "Goal created and assigned successfully." });
    } catch (error) {
        console.error("Error creating goal:", error);
        return res.status(500).json({ status: "error", message: "Internal server error." });
    }
}