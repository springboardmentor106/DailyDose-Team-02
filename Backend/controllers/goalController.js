import Caretaker from '../models/caretakerModel.js';
import GOAL from '../models/goalModel.js';
import User from '../models/userModel.js';

// All routes - validate uuid from jwt token and match with uuid to create goal

export const createGoal = async (req, res) => {
    try {
        const userId = req.userId;
        const role = req.role;

        console.log(userId, role);

        if (role !== 'user') {
            return res.status(403).json({ status: "failed", message: "Only user have access" });
        }

        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        const user = await User.findOne({ uuid: userId })
        // console.log(user);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "user not found" });
        }

        const goal = new GOAL(req.body);
        await goal.save();

        user.goals.push(goal._id)
        await user.save();

        return res.status(200).json({ status: "success", message: 'Goal Created Successfully' });
    } catch (error) {
        res.status(400).json({ status: "failed", message: error.message });
    }
};

export const getUserGoals = async (req, res) => {
    try {
        const userId = req.userId; // userId is actually uuid, so dont findById
        const role = req.role;

        // console.log(userId, role);

        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        let goals;
        if (role === 'user') {
            const user = await User.findOne({ uuid: userId })
            if (!user) {
                return res.status(404).json({ status: "failed", message: `User not found for ID: ${userId}` });
            }
            const goalIds = user.goals;
            goals = await GOAL.find({ _id: { $in: goalIds } });
        } else if (role === 'caretaker') {
            const caretaker = await Caretaker.findOne({ uuid: userId })
            if (!caretaker) {
                return res.status(404).json({ status: "failed", message: `Caretaker not found for ID: ${userId}` });
            }

            const seniorId = req.body.seniorId;

            const senior = await User.find(seniorId);
            if (!senior) {
                return res.status(404).json({ status: "failed", message: `Senior user not found for ID: ${seniorId}` });
            }
            const goalIds = senior.goals;
            goals = await GOAL.find({ _id: { $in: goalIds } });
        }

        res.json({ status: "success", goals });

    } catch (error) {
        console.error('Error fetching user goals:', error);
        res.status(500).json({ status: "error", message: "Failed to retrieve user goals" });
    }
};


export const updateGoal = async (req, res) => {
    try {
        const { role, userId } = req;
        // const goalId = req.params
        const {goalId, ...body} = req.body;

        // console.log(userId, role, body);

        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        let user;
        if (role === 'user') {
            user = await User.findOne({ uuid: userId })
            if (!user) {
                return res.status(404).json({ status: "failed", message: `User not found for ID: ${userId}` });
            }

            const verifyGoal = user.goals.find(goal => String(goal) === goalId);
            if (!verifyGoal) {
                return res.status(404).json({ status: "failed", message: "Goal not found" });
            }
        } else if (role === 'caretaker') {
            user = await Caretaker.findOne({ uuid: userId })
            if (!user) {
                return res.status(404).json({ status: "failed", message: `Caretaker not found for ID: ${userId}` });
            }
        } else {
            return res.status(403).json({ status: "failed", message: "Unauthorized" });
        }

        const verifyGoal = user.goals.includes(goalId);
        if (!verifyGoal) {
            return res.status(403).json({ status: "failed", message: "Unauthorized to update goal" });
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
        
        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }
        
        let user
        if (role === 'user') {
            user = await User.findOne({ uuid: userId })
            if (!user) {
                return res.status(404).json({ status: "failed", message: `User not found for ID: ${userId}` });
            }

            const verifyGoal = user.goals.find(goal => String(goal) === goalId);
            if (!verifyGoal) {
                return res.status(404).json({ status: "failed", message: "Goal not found" });
            }
        } else if (role === 'caretaker') {
            user = await Caretaker.findOne({ uuid: userId })
            if (!user) {
                return res.status(404).json({ status: "failed", message: `Caretaker not found for ID: ${userId}` });
            }
        } else {
            return res.status(403).json({ status: "failed", message: "Unauthorized" });
        }

        const verifyGoal = user.goals.includes(goalId);
        if (!verifyGoal) {
            return res.status(403).json({ status: "failed", message: "Unauthorized to delete goal" });
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


export const getMonthlyGoalProgress = async (req, res) => {
    try {
        const { userId, role } = req;

        let seniorId, senior;

        if (role === 'user') {
            senior = await User.findOne({ uuid: userId })
            if (!senior) {
                return res.status(404).json({ status: "failed", message: `User not found for ID: ${userId}` });
            }
            seniorId = userId;
        } else if (role === 'caretaker') {
            const caretaker = await Caretaker.findOne({ uuid: userId })
            if (!caretaker) {
                return res.status(404).json({ status: "failed", message: `Caretaker not found for ID: ${userId}` });
            }
            seniorId = req.body.seniorId;

            senior = await User.findById(seniorId);
            if (!senior) {
                return res.status(404).json({ status: "failed", message: `Senior user not found for ID: ${seniorId}` });
            }
        } else {
            return res.status(403).json({ status: "failed", message: "Unauthorized" });
        }

        const totalYearlyGoals = senior.goals.length;

        const currentYear = new Date().getFullYear();
        const monthsData = [];

        for (let month = 0; month < 12; month++) {
            const firstDayOfMonth = new Date(currentYear, month, 1);
            const lastDayOfMonth = new Date(currentYear, month + 1, 0);

            const monthName = firstDayOfMonth.toLocaleString('default', { month: 'long' });

            const monthlyGoals = await GOAL.countDocuments({
                senior: seniorId,
                targetDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
            });

            const completedGoals = await GOAL.countDocuments({
                senior: seniorId,
                completed: true,
                targetDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
            });

            const completePercentage = monthlyGoals > 0 ? (completedGoals / monthlyGoals) * 100 : 0;

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
    } catch (error) {
        console.error('Error fetching monthly goal progress:', error);
        res.status(500).json({ status: "error", message: "Failed to retrieve monthly goal progress" });
    }
};


export const getDailyGoalProgress = async (req, res) => {
    try {
        const { userId, role } = req;

        let seniorId, senior;

        if (role === 'user') {
            senior = await User.findOne({ uuid: userId })
            if (!senior) {
                return res.status(404).json({ status: "failed", message: `User not found for ID: ${userId}` });
            }
            seniorId = userId;
        } else if (role === 'caretaker') {
            const caretaker = await Caretaker.findOne({ uuid: userId })
            if (!caretaker) {
                return res.status(404).json({ status: "failed", message: `Caretaker not found for ID: ${userId}` });
            }
            seniorId = req.body.seniorId;
            senior = await User.findById(seniorId);
            if (!senior) {
                return res.status(404).json({ status: "failed", message: `Senior user not found for ID: ${seniorId}` });
            }
        } else {
            return res.status(403).json({ status: "failed", message: "Unauthorized" });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalTodayGoals = await GOAL.countDocuments({
            senior: seniorId,
            targetDate: today
        });

        const completedGoals = await GOAL.countDocuments({
            senior: seniorId,
            targetDate: today,
            completed: true
        });

        const completePercent = totalTodayGoals > 0 ? (completedGoals / totalTodayGoals) * 100 : 0;

        res.json({
            totalTodayGoals,
            completedGoals,
            completePercent: completePercent.toFixed(2)
        });
    }
    catch (error) {
        console.error('Error fetching daily goal progress:', error);
        res.status(500).json({ status: "error", message: "Failed to get daily goal progress" });
    }
};