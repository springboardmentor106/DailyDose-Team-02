import HABIT from '../models/habitModel.js';
import User from '../models/userModel.js';

// only user can CRUD

export const createHabit = async (req, res) => {
    try {
        const { userId, role } = req;

        if (role !== 'user') {
            return res.status(403).json({ status: "failed", message: "Only users have access to create habits" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        const habitData = req.body;

        const habit = new HABIT(habitData);
        await habit.save();

        user.habits.push(habit._id)
        await user.save()

        res.status(201).json({ status: "success", message: "Habit saved successfully" });
    } catch (error) {
        console.error("Error creating habit:", error);
        res.status(400).json({ message: "Failed to create habit", error: error.message });
    }
};


export const getHabits = async (req, res) => {
    try {
        const { userId, role } = req;

        if (role !== 'user') {
            return res.status(403).json({ status: "failed", message: "Only users have access" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        let habits = []
        for (let i = 0; i < user.habits.length; i++) {
            const habit = await HABIT.findById(user.habits[i])

            habits.push(habit)
        }
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateHabit = async (req, res) => {
    try {
        const { userId, role } = req;
        const { habitId, ...body } = req.body;

        if (role !== 'user') {
            return res.status(403).json({ status: "failed", message: "Only users have access" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        const verifyHabit = user.habits.includes(habitId);
        if (!verifyHabit) {
            return res.status(403).json({ status: "failed", message: "Unauthorized to update this habit" });
        }

        const updatedHabit = await HABIT.findByIdAndUpdate(habitId, body, { new: true });
        if (!updatedHabit) {
            return res.status(404).json({ status: "failed", message: "Habit not found" });
        }

        res.json({ status: "success", message: "Habit updated" });
    } catch (error) {
        console.error("Error updating habit:", error);
        res.status(400).json({ message: "Failed to update habit", error: error.message });
    }
};


export const deleteHabit = async (req, res) => {
    try {
        const { userId, role } = req;
        const { habitId } = req.body;

        if (role !== 'user') {
            return res.status(403).json({ status: "failed", message: "Only users have access" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        const verifyHabit = user.habits.includes(habitId);
        if (!verifyHabit) {
            return res.status(403).json({ status: "failed", message: "Unauthorized to delete this habit" });
        }

        const habit = await HABIT.findByIdAndDelete(habitId);
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        res.json({ status: "failed", message: 'Habit deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};