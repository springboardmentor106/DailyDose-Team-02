import GOAL from '../models/goalModel.js';

export const createGoal = async (req, res) => {
    try {
        const goal = new GOAL(req.body);
        await goal.save();
        return res.status(200).json({ status: "success", message: 'Goal Created Successfully' });
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
        const updatedGoal = await GOAL.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGoal) {
            return res.status(404).json({ status: "failed", message: 'Goal not found' });
        }
        // res.json(updatedGoal);
        return res.status(200).json({ status: "success", message: 'Goal Updated Successfully' });


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteGoal = async (req, res) => {
    try {
        const goal = await GOAL.findByIdAndDelete(req.params.id);
        if (!goal) {
            return res.status(404).json({ status: "failed", message: 'Goal not found' });
        }
        res.json({ status: "success", message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const goalStats = async (req, res) => {
    try {
        const { userId, role } = req; // Getting userId from decoded token
        const totalGoals = await GOAL.countDocuments({ user: userId });
        // const totalGoals = await GOAL.countDocuments();
        if (!totalGoals) {
            return res.status(404).json({ status: "failed", message: 'Goal not found' })
        }
        const currentMonthGoals = await GOAL.countDocuments({
            user: userId,
            targetDate: {
                $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
            }
        });
        const completedGoals = await GOAL.countDocuments({ completed: true });
        const currentMonthCompletedGoals = await GOAL.countDocuments({
            user: userId,
            completed: true,
            targetDate: {
                $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
            }
        });

        // Calculating percentage compleated goals for current month
        const percentageCompleted = currentMonthGoals > 0
            ? (currentMonthCompletedGoals / currentMonthGoals) * 100
            : 0;

        res.json({
            totalGoals,
            currentMonthGoals,
            completedGoals,
            currentMonthCompletedGoals,
            currentMonthPercentageCompleted: percentageCompleted.toFixed(2)
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}