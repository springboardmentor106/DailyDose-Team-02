import HABIT from '../models/habitModel.js';
import User from '../models/userModel.js';

// only user can CRUD
export const createHabit = async (req, res) => {
    try {
        const { userId, role } = req;

        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        if (!role) {
            return res.status(404).json({ status: "failed", message: "role not captured" });
        }

        if (role !== 'user') {
            return res.status(403).json({ status: "failed", message: "Only users have access to create habits" });
        }

        const user = await User.findOne({ uuid: userId })
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        const habitData = req.body;

        const habit = new HABIT(habitData);
        const savedHabit = await habit.save();
        if (!savedHabit) {
            res.status(400).json({ status: "failed", message: "Error while updating the habit" });
        }

        user.habits.push(habit.uuid)
        const savedUser = await user.save()
        if (!savedUser) {
            res.status(400).json({ status: "failed", message: "Error while updating the user" });
        }

        res.status(201).json({ status: "success", message: "Habit saved successfully" });
    } catch (error) {
        console.error("Error creating habit:", error);
        res.status(400).json({ message: "Failed to create habit", error: error.message });
    }
};

export const getHabits = async (req, res) => {
    try {
        const userId = req.userId;
        const role = req.role;
        const { seniorCitizenId } = req.body
        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        if (!role) {
            return res.status(404).json({ status: "failed", message: "role not captured" });
        }

        const user = await User.findOne({ uuid: role === "user" ? userId : seniorCitizenId })
    
        let habits = [];
        let habitLength = user.habits.length

        for (let i = 0; i < habitLength; i++) {
            const habit = await HABIT.findOne({ uuid: user.habits[i] })
            habit ? habits.push(habit) : null
        }
        return res.json({ status: "success", habits });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateHabit = async (req, res) => {
    try {
        const { userId, role } = req;
        const { habitId, ...body } = req.body;

        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        if (!role) {
            return res.status(404).json({ status: "failed", message: "role not captured" });
        }

        if (role !== 'user') {
            return res.status(403).json({ status: "failed", message: "Only users have access" });
        }

        const user = await User.findOne({ uuid: userId })
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        // const verifyHabit = user.habits.includes(habitId);
        // if (!verifyHabit) {
        //     return res.status(403).json({ status: "failed", message: "Unauthorized to update this habit" });
        // }

        const updatedHabit = await HABIT.findOneAndUpdate({ uuid: habitId }, body, { new: true });
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
        const habitId = req.body;

        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        if (!role) {
            return res.status(404).json({ status: "failed", message: "role not captured" });
        }

        if (role !== 'user') {
            return res.status(403).json({ status: "failed", message: "Only users have access" });
        }

        const user = await User.findOne({ uuid: userId })
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        const habit = await HABIT.findOneAndDelete({ uuid: habitId });
        if (!habit) {
            return res.status(404).json({ status: "failed", message: 'Habit not found' });
        }

        return res.json({ status: "success", message: 'Habit deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};