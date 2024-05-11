import GOAL from '../models/goalModel.js';
import { createGoalSchema, updateGoalSchema } from '../validations/userGoalValidation.js';

export const createGoal = async (req, res) => {
    try {
        // Validation
        const {error, value} = createGoalSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ status: "failed", message: error.message })
        }

        const goal = new GOAL(value);
        await goal.save();
        return res.status(200).json({ status: "success",message: 'Goal Created Successfully' });
        // res.status(201).json(goal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getGoals = async (req, res) => {
    try {
        const goals = await GOAL.find();
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateGoal = async (req, res) => {
    try {
        // Validation
        const {error, value} = updateGoalSchema.validate({
            id: req.params.id,
            bodyData: req.bod
        })
        if (error) {
            return res.status(400).json({ status: "failed", message: error.message })
        }

        const updatedGoal = await GOAL.findByIdAndUpdate(value.id, value.bodyData, { new: true });
        if (!updatedGoal) {
            return res.status(404).json({ status: "failed",message: 'Goal not found' });
        }
        // res.json(updatedGoal);
        return res.status(200).json({ status: "success",message: 'Goal Updated Successfully' });
        
    
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteGoal = async (req, res) => {
    try {
        const goal = await GOAL.findByIdAndDelete(req.params.id);
        if (!goal) {
            return res.status(404).json({ status: "failed",message: 'Goal not found' });
        }
        res.json({ status: "success",message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};