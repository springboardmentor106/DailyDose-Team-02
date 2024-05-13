import HABIT from '../models/habitModel.js';
import { createHabitSchema, updateHabitSchema } from '../validations/userHabitValidation.js';

export const createHabit = async (req, res) => {
    try {
        // validation
        const { error, value } = createHabitSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ status: "failed", message: error.message })
        }
        const habit = new HABIT(value);
        await habit.save();
        res.status(201).json(habit);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getHabits = async (req, res) => {
    try {
        const habits = await HABIT.find();
        res.json(habits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateHabit = async (req, res) => {
    try {
        // validation
        const { error, value } = updateHabitSchema.validate({
            id: req.params.id,
            bodyData: req.body
        })
        if (error) {
            return res.status(400).json({ status: "failed", message: error.message })
        }

        const updatedHabit = await HABIT.findByIdAndUpdate(value.id, value.bodyData , { new: true });
        if (!updatedHabit) {
            return res.status(404).json({ message: 'Habit not found' });
        }
        res.json(updatedHabit);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteHabit = async (req, res) => {
    try {
        const habit = await HABIT.findByIdAndDelete(req.params.id);
        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }
        res.json({ message: 'Habit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};