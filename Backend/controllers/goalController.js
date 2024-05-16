import Caretaker from '../models/caretakerModel.js';
import GOAL from '../models/goalModel.js';
import User from '../models/userModel.js';

// All routes - validate uuid from jwt token and match with uuid to create goal
export const createGoal = async (req, res) => {
    try {
        if (req.role !== 'user') {
            return res.status(403).json({ status: "failed", message: "Only user have access" });
        }
        const userId = req.userId;
        const user = await User.findById(userId)
        if (!Boolean(user)) {
            return res.status(404).json({ status: "failed", message: "user not found" });
        }

        const goal = new GOAL(req.body);
        await goal.save();

        user.goals.push(goal._id)
        await user.save();

        return res.status(200).json({ status: "success", message: 'Goal Created Successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserGoals = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: "failed", message: `User not found for ID: ${userId}` });
        }

        const goalIds = user.goals;
        const goals = await GOAL.find({ _id: { $in: goalIds } });

        res.json(goals);
    } catch (error) {
        console.error('Error fetching user goals:', error);
        res.status(500).json({ status: "error", message: "Failed to retrieve user goals" });
    }
};


export const updateGoal = async (req, res) => {
    try {
        const { role, userId } = req;
        const { goalId, ...body } = req.body;

        let user;
        if (role === 'user') {
            user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ status: "failed", message: `User not found for ID: ${userId}` });
            }

            const verifyGoal = user.goals.find(goal => String(goal) === goalId);
            if (!verifyGoal) {
                return res.status(404).json({ status: "failed", message: "Goal not found" });
            }
        } else if (role === 'caretaker') {
            user = await Caretaker.findById(userId);
            if (!user) {
                return res.status(404).json({ status: "failed", message: `Caretaker not found for ID: ${userId}` });
            }
        } else {
            return res.status(403).json({ status: "failed", message: "Unauthorized" });
        }

        const updatedGoal = await GOAL.findByIdAndUpdate(goalId, body, { new: true });
        if (!updatedGoal) {
            return res.status(404).json({ status: "failed", message: `Error in updating goal for ID: ${goalId}` });
        }
        if (!updatedGoal && role === 'caretaker') {
            return res.status(404).json({ status: "failed", message: `Error in updating goal or goal not found` });
        }

        return res.status(200).json({ status: "success", message: 'Goal Updated Successfully' });
    } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ status: "error", message: "Failed to update goal" });
    }
};


export const deleteGoal = async (req, res) => {
    try {
        const { role, userId } = req;
        const { goalId } = req.body;
        let user
        if (role === 'user') {
            user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ status: "failed", message: `User not found for ID: ${userId}` });
            }

            const verifyGoal = user.goals.find(goal => String(goal) === goalId);
            if (!verifyGoal) {
                return res.status(404).json({ status: "failed", message: "Goal not found" });
            }
        } else if (role === 'caretaker') {
            user = await Caretaker.findById(userId);
            if (!user) {
                return res.status(404).json({ status: "failed", message: `Caretaker not found for ID: ${userId}` });
            }
        } else {
            return res.status(403).json({ status: "failed", message: "Unauthorized" });
        }

        const goal = await GOAL.findByIdAndDelete(goalId);
        if (!goal) {
            return res.status(404).json({ status: "failed", message: 'Goal not found' });
        }
        res.json({ status: "success", message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const monthlyGoalProgress = async (req, res) => {
    // get details for all moths Jan-dec
    try {
        const { userId, role } = req;

        let user
        if (role === 'user') {
            user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ status: "failed", message: `User not found for ID: ${userId}` });
            }
        }
        // else if (role === 'caretaker') {
        //     user = await Caretaker.findById(userId);
        //     if (!user) {
        //         return res.status(404).json({ status: "failed", message: `Caretaker not found for ID: ${userId}` });
        //     }
        // } 
        else {
            return res.status(403).json({ status: "failed", message: "Unauthorized" });
        }

        const totalYearlyGoals = user.goals.length
        // const totalGoals = await GOAL.countDocuments();
        if (!totalGoals) {
            return res.status(404).json({ status: "failed", message: 'Goal not found' })
        }

        // calculating goal compleated percentage for all months
        const currentYear = new Date().getFullYear();
        const monthsData = [];

        for (let month = 0; month < 12; month++) {
            const firstDayOfMonth = new Date(currentYear, month, 1);
            const lastDayOfMonth = new Date(currentYear, month + 1, 0);

            const monthName = new Date(currentYear, month).toLocaleString('default', { month: 'long' });

            const completedGoals = await GOAL.countDocuments({
                user: userId,
                completed: true,
                targetDate: { $gte: firstDayOfMonth, $lt: lastDayOfMonth }
            });

            const monthlyGoals = await GOAL.countDocuments({
                user: userId,
                completed: true,
                targetDate: { $gte: firstDayOfMonth, $lt: lastDayOfMonth }
            });

            const completePercentage = monthlyGoals > 0 ? (completedGoals / monthlyGoals) * 100 : 0

            monthsData.push({
                month: monthName,
                monthlyGoals,
                completedGoals,
                completePercentage: completePercentage.toFixed(2)
            });
        }

        res.json({
            totalYearlyGoals,
            monthsData
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}


export const dailyGoalProgress = async (req, res) => {
    try {
        const { userId, role } = req;

        let user
        if (role === 'user') {
            user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ status: "failed", message: `User not found for ID: ${userId}` });
            }
        }
        else {
            return res.status(403).json({ status: "failed", message: "Unauthorized" });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalTodayGoals = await GOAL.countDocuments({
            user: userId,
            targetDate: today
        });

        const completedGoals = await GOAL.countDocuments({
            user: userId,
            targetDate: today,
            completed: true
        });

        const completePercent = totalTodayGoals > 0 ? (completedGoals / totalTodayGoals) * 100 : 0;

        res.json({
            totalTodayGoals,
            completedGoals,
            completePercent: completePercent.toFixed(2)
        });
    } catch (error) {
        console.error('Error fetching daily goal progress:', error);
        res.status(500).json({ status: "error", message: "Failed to fetch daily goal progress" });
    }
};