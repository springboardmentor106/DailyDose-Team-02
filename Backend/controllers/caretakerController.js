import Caretaker from '../models/caretakerModel.js';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';

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
        const users = await User.find({ caretaketAssigned: false }, ["uuid", "email"]);

        return res.status(200).json({ status: "success", users });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ status: "error", message: "Internal server error." });
    }
}


export const assignUser = async (req, res) => {
    try {
        const { userId, role } = req;

        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        if (!role) {
            return res.status(404).json({ status: "failed", message: "role not captured" });
        }

        if (role !== 'caretaker') {
            return res.status(403).json({ status: "failed", message: "Only caretakers have access" });
        }

        const { seniorId } = req.body;

        if (!seniorId) {
            return res.status(400).json({ status: "failed", message: "seniorId is required." });
        }

        const caretaker = await Caretaker.findOne({ uuid: userId });
        if (!caretaker) {
            return res.status(404).json({ status: "failed", message: "Caretaker not found." });
        }

        const user = await User.findOne({ uuid: seniorId });
        if (!user) {
            return res.status(404).json({ status: "failed", message: "senior not found." });
        }

        if (caretaker.assignedSeniors.includes(seniorId)) {
            return res.status(400).json({ status: "failed", message: "User is already assigned to this caretaker." });
        }

        // Assign user to caretaker
        caretaker.assignedSeniors.push(seniorId);
        await caretaker.save();

        await User.updateOne({ uuid: seniorId }, { $set: { caretaker: userId, caretakerAssigned: true } });

        return res.status(200).json({ status: "success", message: "User successfully assigned to caretaker." });

    } catch (error) {
        console.error("Error assigning user to caretaker:", error);
        return res.status(500).json({ status: "error", message: "Internal server error." });
    }
};


export const createUserGoal = async (req, res) => {
    try {
        const role = req.role;
        if (role !== 'caretaker') {
            return res.status(401).json({ status: "failed", message: "Only caretakers can access this endpoint" });
        }

        const caretakerId = req.userId;

        const { userId, ...goalData } = req.body;

        // Check if caretaker exists
        const caretaker = await Caretaker.findOne({ uuid: caretakerId });
        if (!caretaker) {
            return res.status(404).json({ status: "failed", message: "caretaker not found" });
        }

        // Check if user exists
        const user = await User.findOne({ uuid: userId });
        if (!user) {
            return res.status(404).json({ status: "failed", message: "user not found" });
        }


        // Check if senior assigned to caretaker
        const isUserAssigned = caretaker.assignedSeniors.find(element => element = userId)
        if (!Boolean(isUserAssigned)) {
            return res.status(404).json({ status: "failed", message: "senior is not assigned to caretaker" });
        }

        const newGoal = new Goal({
            uuid: uuidv4(),
            createdBy: [caretakerId, role],
            createdForSenior: userId,
            ...goalData
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
            const senior = await User.findById(_id)

            seniorArr.push(senior)
        }

        return res.status(200).json({ status: "success", seniorArr });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", message: error.message });
    }
}