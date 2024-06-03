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


export const getAllUnassignedUser = async (req, res) => {
    try {
        if (req.role !== 'caretaker') {
            return res.status(403).json({ status: "failed", message: "Only caretakers can access this endpoint" });
        }

        // Find all user's uuid in the database - which are not assigned
        const users = await User.find({ caretaketAssigned: false });

        return res.status(200).json({ status: "success", users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ status: "error", message: "Internal server error." });
    }
}


export const assignUser = async (req, res) => {
    try {
        if (req.role !== 'caretaker') {
            return res.status(403).json({ status: "failed", message: "Only caretakers can assign users" });
        }

        const caretakerId = req.userId;
        const { userId } = req.body;

        const caretaker = await Caretaker.findOne({ uuid: caretakerId });
        if (!caretaker) {
            return res.status(404).json({ status: "failed", message: "Caretaker not found." });
        }

        const user = await User.findOne({ uuid: userId });
        console.log(user)
        if (!user) {
            return res.status(404).json({ status: "failed", message: `User not found` });
        }
        if (caretaker.assignedSeniors.includes(userId)) {
            return res.status(400).json({ status: "failed", message: `User is already assigned to caretaker` });
        }
        caretaker.assignedSeniors.push(userId)
        const savedCaretaker = await caretaker.save()
        const savedUser = await User.findOneAndUpdate({ uuid: userId }, { caretaker: caretakerId, caretaketAssigned: true }, { new: true })

        if (!savedCaretaker || !savedUser) {
            return res.status(404).json({ status: "failed", message: `Error while adding user to caretaker` });
        }

        return res.status(200).json({ status: "success", message: `Users assigned successfully` });

    } catch (error) {
        console.error("Error assigning users to caretaker:", error);
        return res.status(500).json({ status: "error", message: "Internal server error." + error });
    }
};


export const createUserGoal = async (req, res) => {
    try {
        if (req.role !== 'caretaker') {
            return res.json({ message: "Only caretakers can access this endpoint" });
        }

        const caretakerId = req.userId;

        const { userId, title, description, targetDate, dayFrequency } = req.body;

        // Check if user exists
        const user = await User.findOne({ uuid: userId });
        if (!user) {
            return res.status(404).json({ status: "failed", message: "user not found" });
        }

        // Check if caretaker exists
        const caretaker = await Caretaker.findOne({ uuid: caretakerId });
        if (!caretaker) {
            return res.status(404).json({ status: "failed", message: "caretaker not found" });
        }

        // Check if senior assigned to caretaker
        const isUserAssigned = caretaker.assignedSeniors.find(element => element = userId)
        if (!Boolean(isUserAssigned)) {
            return res.status(404).json({ status: "failed", message: "senior is not assigned to caretaker" });
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


export const getAssignedUserDetail = async (req, res) => {
    try {
        const { userId, role } = req

        if (!userId) {
            return res.status(403).json({ status: "failed", message: "error capturing uuid" });
        }

        if (!role) {
            return res.status(403).json({ status: "failed", message: "error capturing role" });
        }

        if (role !== 'caretaker') {
            return res.status(403).json({ status: "failed", message: "Only caretakers can access this endpoint" });
        }

        const caretaker = await Caretaker.findOne({ uuid: userId })

        const assignedSeniorsArr = caretaker.assignedSeniors
        const assignedSeniorsArrLen = assignedSeniorsArr.length
        if (!assignedSeniorsArrLen) {
            return res.status(200).json({ status: "success", message: "no senior assigned" })
        }

        let seniorArr = []
        for (let i = 0; i < assignedSeniorsArrLen; i++) {
            const senior = await User.findOne({ uuid: assignedSeniorsArr[i] })
            senior ? seniorArr.push(senior) : null
        }

        return res.status(200).json({ status: "success", seniorArr });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", message: error.message });
    }
}