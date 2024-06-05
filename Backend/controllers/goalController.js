import Caretaker from '../models/caretakerModel.js';
import GOAL from '../models/goalModel.js';
import User from '../models/userModel.js';
import sendNotification from './sendNotification.js';
import messages from "./messages.js"
// All routes - validate uuid from jwt token and match with uuid to create goal
const getTodayGoals = async ({ userId, caretakerId }) => {
    try {
        const today = new Date();
        const dayOfWeek = today.toLocaleString("en-us", { weekday: "long" }); // e.g., 'Monday'

        const todaysGoals = await GOAL.find({
            createdById: { $in: [userId, caretakerId] },
            completed: false,
            $or: [
                { dayFrequency: "Daily" },
                { dayFrequency: "Today" },
                { dayFrequency: dayOfWeek },
            ],
        });
        return { todaysGoals, error: null };
    } catch (error) {
        return { error: error, todaysGoals: null };
    }
};

export const createGoal = async (req, res) => {
    try {
        const userId = req.userId;
        const role = req.role;
        const { seniorCitizenId } = req.body;

        if (!userId) {
            return res
                .status(404)
                .json({ status: "failed", message: "uuid not captured" });
        }

        const user = await User.findOne({
            uuid: role === "user" ? userId : seniorCitizenId,
        });
        if (!user) {
            return res
                .status(404)
                .json({ status: "failed", message: "user not found" });
        }

        const goal = new GOAL({ ...req.body, createdBy: role, createdById: userId });
        const savedGoal = await goal.save();
        if (!savedGoal) {
            return res.status(400).json({ status: "failed", message: 'Error while saving the new goal. try again!' });
        }
        user.goals.push(goal.uuid)
        const savedUser = await user.save();
        if (!savedUser) {
            return res.status(400).json({ status: "failed", message: "Error while updating the user goal try again!" });
        }
        // send notification to the user
        const sendNotificationResult = await sendNotification({
            title: `New Goal Set! by ${role === "user" ? "you" : "caretaker"}`,
            description: "A new challenge awaits! Your goal is now set. Stay focused and make it happen " + req.body.title,
            userId: role === "user" ? userId : seniorCitizenId,
            belongTo: "goal"
        })

        if (!sendNotificationResult) {
            console.log("notification not sent when created goal", sendNotificationResult)
        }
        return res.status(200).json({ status: "success", message: 'Goal Created Successfully' });
    } catch (error) {
        res.status(400).json({ status: "failed", message: error.message });
    }
};

export const getUserGoals = async (req, res) => {
    try {
        const userId = req.userId; // userId is actually uuid, so dont findById
        const role = req.role;
        let { seniorCitizenId, caretakerId } = req.body;
        role === "user" ? (seniorCitizenId = userId) : (caretakerId = userId);
        if (!userId) {
            return res
                .status(404)
                .json({ status: "failed", message: "uuid not captured" });
        }
        const { error, todaysGoals } = await getTodayGoals({
            userId: seniorCitizenId,
            caretakerId: caretakerId,
        });

        for (let i = 0; i < todaysGoals.length; i++) {
            const goal = todaysGoals[i];
            const today = new Date().toISOString().split("T")[0];

            // Check if today's date is in the completedDays list
            const isCompletedToday = goal.completedDays.some(
                (date) => new Date(date).toISOString().split("T")[0] === today
            );

            // Update the completedToday status
            goal.completedToday = isCompletedToday;

            // Save the updated goal
            await goal.save();
        }

        if (error) {
            return res.status(200).json({ status: "failed", message: error });
        }
        return res.status(200).json({ status: "success", goals: todaysGoals });
    } catch (error) {
        console.error("Error fetching user goals:", error);
        return res
            .status(500)
            .json({ status: "error", message: "Failed to retrieve user goals" });
    }
};

export const updateGoal = async (req, res) => {
    try {
        const { role, userId } = req;
        const { goalId, completedToday, ...body } = req.body;

        if (!userId) {
            return res
                .status(404)
                .json({ status: "failed", message: "uuid not captured" });
        }

        let user;
        if (role === "user") {
            user = await User.findOne({ uuid: userId });
            if (!user) {
                return res.status(404).json({
                    status: "failed",
                    message: `User not found for ID: ${userId}`,
                });
            }
            const verifyGoal = user.goals.includes(goalId);
            if (!verifyGoal) {
                return res
                    .status(404)
                    .json({ status: "failed", message: "Goal not found" });
            }
        } else if (role === "caretaker") {
            user = await Caretaker.findOne({ uuid: userId });
            if (!user) {
                return res.status(404).json({
                    status: "failed",
                    message: `Caretaker not found for ID: ${userId}`,
                });
            }
        } else {
            return res
                .status(403)
                .json({ status: "failed", message: "Unauthorized" });
        }

        const goal = await GOAL.findOne({ uuid: goalId });

        if (!goal) {
            return res.status(404).json({
                status: "failed",
                message: `Goal not found for ID: ${goalId}`,
            });
        }

        const today = new Date().toISOString().split("T")[0];

        if (completedToday) {
            // Mark today's goal as completed
            if (!goal.completedDays.some(date => new Date(date).toISOString().split('T')[0] === today)) {
                goal.completedDays.push(today);
            }
            // Remove today from skippedDays if it exists
            goal.skippedDays = goal.skippedDays.filter(
                (date) => new Date(date).toISOString().split("T")[0] !== today
            );
            goal.completedToday = true;
        } else {
            // Remove today from completedDays if it exists
            goal.completedDays = goal.completedDays.filter(
                (date) => new Date(date).toISOString().split("T")[0] !== today
            );

            // Mark today's goal as skipped if it's not completed
            if (
                !goal.skippedDays.some(
                    (date) => new Date(date).toISOString().split("T")[0] === today
                )
            ) {
                goal.skippedDays.push(today);
            }

            goal.completedToday = false;
        }
        await goal.save();

        Object.assign(goal, body);

        const updatedGoal = await goal.save();

        if (completedToday) {
            if (role === "user") {
                // send notification to the user
                const sendNotificationResult = await sendNotification({
                    title: "Congratulations on Completing Your Goal!",
                    description: "You've successfully achieved your target! Keep up the great work and continue reaching for new heights. ",
                    userId: userId,
                    belongTo: "goal"
                })

                if (!sendNotificationResult) {
                    console.log("notification not sent when created goal", sendNotificationResult)
                }
            }

        }
        return res.status(200).json({ status: "success", message: 'Goal Updated Successfully', goal: updatedGoal });
    } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ status: "error", message: "Failed to update goal" + error });
    }
};

export const deleteGoal = async (req, res) => {
    try {
        const { role, userId } = req;
        const { goalId } = req.body;

        if (!userId) {
            return res
                .status(404)
                .json({ status: "failed", message: "UUID not captured" });
        }

        let user;
        if (role === "user") {
            user = await User.findOne({ uuid: userId });
            if (!user) {
                return res.status(404).json({
                    status: "failed",
                    message: `User not found for ID: ${userId}`,
                });
            }
            // const verifyGoal = user.goals.find(goal => goal.uuid === goalId);
            // if (!verifyGoal) {
            //     return res.status(404).json({ status: "failed", message: "Goal not found" });
            // }
        } else if (role === "caretaker") {
            user = await Caretaker.findOne({ uuid: userId });
            if (!user) {
                return res.status(404).json({
                    status: "failed",
                    message: `Caretaker not found for ID: ${userId}`,
                });
            }
        } else {
            return res
                .status(403)
                .json({ status: "failed", message: "Unauthorized" });
        }

        const goal = await GOAL.findOneAndDelete({ uuid: goalId });
        if (!goal) {
            return res
                .status(404)
                .json({ status: "failed", message: "Goal not found" });
        }
        const updatedGoals = user.goals.filter((goal) => goal !== goalId);
        user.goals = updatedGoals;
        user.save();

        return res.json({
            status: "success",
            message: "Goal deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteAllGoal = async (req, res) => {
    try {
        const { userId, role } = req;

        if (!userId) {
            return res
                .status(404)
                .json({ status: "failed", message: "uuid not captured" });
        }

        if (!role) {
            return res
                .status(404)
                .json({ status: "failed", message: "role not captured" });
        }

        let user;
        if (role === "user") {
            user = await User.findOne({ uuid: userId });
            if (!user) {
                return res.status(404).json({
                    status: "failed",
                    message: `User not found for ID: ${userId}`,
                });
            }

            const goalsLength = user.goals.length;

            if (!goalsLength) {
                return res.status(200).json({
                    status: "success",
                    message: `No goal found to delete for senior ID: ${userId}`,
                });
            }

            for (let i = 0; i < goalsLength; i++) {
                try {
                    const deleteGoal = await GOAL.findOneAndDelete({
                        uuid: user.goals[i],
                    });
                    if (!deleteGoal) {
                        return res.status(404).json({ status: "failed", message: 'Error while deleting goal please try again' });
                    }
                } catch (error) {
                    return res.status(404).json({ status: "failed", message: 'Error while deleting goal please try again' + error });
                }
            }

            return res.status(200).json({ status: "success", message: 'All Goal deleted successfully' });

        } else if (role === 'caretaker') {
            const caretaker = await Caretaker.findOne({ uuid: userId })

            if (!caretaker) {
                return res.status(404).json({
                    status: "failed",
                    message: `Caretaker not found for ID: ${userId}`,
                });
            }

            const seniorId = req.body.seniorId;

            if (!seniorId) {
                return res.status(404).json({
                    status: "failed",
                    message: `send assigned seniorId to caretaker`,
                });
            }

            const verifySenior = caretaker.assignedSeniors.find(
                (senior) => (senior = seniorId)
            );
            if (!verifySenior) {
                return res.status(404).json({
                    status: "failed",
                    message: `this senior in not assigned to you`,
                });
            }

            const senior = await User.find(seniorId);
            if (!senior) {
                return res.status(404).json({
                    status: "failed",
                    message: `Senior not found for ID: ${seniorId}`,
                });
            }

            const goalsLength = senior.goals.length;

            if (!goalsLength) {
                return res.status(200).json({
                    status: "success",
                    message: `No goal found to delete for senior ID: ${seniorId}`,
                });
            }

            for (let i = 0; i < goalsLength; i++) {
                const deleteGoal = await GOAL.findOneAndDelete({ uuid: user.goals[i] });
                if (!deleteGoal) {
                    return res.status(404).json({ status: "failed", message: 'Error while deleting goal please try again' });
                }
            }

            return res.status(404).json({ status: "success", message: 'All Goal deleted successfully' });

        } else {
            return res
                .status(403)
                .json({ status: "failed", message: "Unauthorized" });
        }
    } catch (error) {
        console.error("Error deleting all goals:", error);
        return res.status(500).json({ status: "error", message: error.message });
    }
};
export const getMonthlyGoalProgress = async (req, res) => {
    try {
        const { userId, role } = req;
        let { seniorCitizenId, caretakerId, year } = req.body;
        role === "user" ? seniorCitizenId = userId : caretakerId = userId;
        let seniorId, senior;

        if (!year) {
            return res.status(400).json({ status: "failed", message: "Year is required in the request body" });
        }

        if (!year) {
            return res.status(400).json({
                status: "failed",
                message: "Year is required in the request body",
            });
        }

        if (role === "user") {
            senior = await User.findOne({ uuid: userId });
            if (!senior) {
                return res.status(404).json({
                    status: "failed",
                    message: `User not found for ID: ${userId}`,
                });
            }
            seniorId = userId;
        } else if (role === "caretaker") {
            const caretaker = await Caretaker.findOne({ uuid: userId });
            if (!caretaker) {
                return res.status(404).json({
                    status: "failed",
                    message: `Caretaker not found for ID: ${userId}`,
                });
            }
            seniorId = seniorCitizenId;

            senior = await User.findOne({ uuid: seniorId });
            if (!senior) {
                return res.status(404).json({
                    status: "failed",
                    message: `Senior user not found for ID: ${seniorId}`,
                });
            }
        } else {
            return res
                .status(403)
                .json({ status: "failed", message: "Unauthorized" });
        }

        const currentDate = new Date();
        const monthsData = [];

        for (let month = 0; month < 12; month++) {
            const firstDayOfMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(year, month + 1, 0);

            const monthName = firstDayOfMonth.toLocaleString("default", {
                month: "long",
            });

            const monthlyGoals = await GOAL.find({
                createdById: seniorId,
                startDate: { $lte: lastDayOfMonth },
                $or: [
                    { endDate: { $exists: false } },
                    { endDate: { $gte: firstDayOfMonth } },
                ],
            });

            let totalGoals = 0;
            let totalCompletedDays = 0;
            let totalSkippedDays = 0;

            for (const goal of monthlyGoals) {
                const startDate = new Date(goal.startDate);
                const endDate = goal.endDate ? new Date(goal.endDate) : lastDayOfMonth;

                const start = startDate < firstDayOfMonth ? firstDayOfMonth : startDate;
                const end = endDate > lastDayOfMonth ? lastDayOfMonth : endDate;

                const daysInMonth = (end - start) / (1000 * 60 * 60 * 24) + 1;

                const completedDaysInMonth = goal.completedDays.filter((date) => {
                    const dateObj = new Date(date);
                    return dateObj >= firstDayOfMonth && dateObj <= lastDayOfMonth;
                }).length;

                let skippedDaysInMonth = goal.skippedDays.filter(date => {
                    const dateObj = new Date(date);
                    return dateObj >= firstDayOfMonth && dateObj <= lastDayOfMonth;
                }).length;

                for (let d = new Date(start); d <= currentDate && d <= end; d.setDate(d.getDate() + 1)) {
                    const dateStr = d.toISOString().split('T')[0];

                    if (!goal.completedDays.some(date => new Date(date).toISOString().split('T')[0] === dateStr) &&
                        (!goal.skippedDays.some(date => new Date(date).toISOString().split('T')[0] === dateStr) ||
                            !goal.skippedDays.map(date => date.toISOString().split('T')[0]).includes(dateStr)) &&
                        d < currentDate) {

                        goal.skippedDays.push(new Date(dateStr));
                        skippedDaysInMonth++;
                    }
                }

                await goal.save();

                const today = new Date().toISOString().split('T')[0];
                const goalEndDate = new Date(end).toISOString().split('T')[0];
                if (goalEndDate < today) {
                    goal.completed = true;
                }

                await goal.save();

                totalGoals += daysInMonth;
                totalCompletedDays += completedDaysInMonth;
                totalSkippedDays += skippedDaysInMonth;
            }

            const completePercentage =
                totalGoals > 0
                    ? (totalCompletedDays / (totalCompletedDays + totalSkippedDays)) * 100
                    : 0;

            monthsData.push({
                month: monthName,
                totalGoals,
                completedDays: totalCompletedDays,
                skippedDays: totalSkippedDays,
                completePercentage: parseFloat(completePercentage.toFixed(2)),
            });
        }

        return res.status(200).json({
            status: "success",
            userId: seniorId,
            role,
            year,
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
        const { seniorCitizenId, caretakerId } = req.body;

        if (role === "user") {
            senior = await User.findOne({ uuid: userId });
            if (!senior) {
                return res.status(404).json({
                    status: "failed",
                    message: `User not found for ID: ${userId}`,
                });
            }
            seniorId = userId;
        } else if (role === "caretaker") {
            const caretaker = await Caretaker.findOne({ uuid: userId });
            if (!caretaker) {
                return res.status(404).json({
                    status: "failed",
                    message: `Caretaker not found for ID: ${userId}`,
                });
            }
            seniorId = seniorCitizenId;
            senior = await User.findOne({ uuid: seniorId });
            if (!senior) {
                return res.status(404).json({
                    status: "failed",
                    message: `Senior user not found for ID: ${seniorId}`,
                });
            }
        } else {
            return res
                .status(403)
                .json({ status: "failed", message: "Unauthorized" });
        }

        const { todaysGoals, error } = await getTodayGoals(
            role === "user"
                ? { userId: seniorId, caretakerId }
                : { userId: seniorCitizenId, caretakerId: userId }
        );

        if (error) {
            return res
                .status(500)
                .json({ status: "error", message: "Failed to get today's goals" });
        }

        const today = new Date().toISOString().split("T")[0];

        const updatedGoals = await Promise.all(
            todaysGoals.map(async (goalData) => {
                const goal = await GOAL.findOne({ uuid: goalData.uuid });
                const goalEndDate = new Date(goal.endDate).toISOString().split("T")[0];
                if (goalEndDate < today) {
                    goal.completed = true;
                }
                await goal.save();
                return goal;
            })
        );

        const completedGoals = updatedGoals.filter(goal => goal.completedToday);
        const completedGoalsLength = completedGoals.length;
        const completePercent = updatedGoals.length > 0 ? (completedGoalsLength / updatedGoals.length) * 100 : 0;
        const user = await User.findOne({ uuid: role === "user" ? userId : seniorCitizenId })
        if (!user) {
            return res.status(404).json({ status: "failed", message: "user not found" })
        }
        // send notification
        if (todaysGoals.length > 0 && user.goalProgress != String(completePercent.toFixed(2)) && role === "user") {
            let title = null;
            let description = null;
            if (parseFloat(user.goalProgress < completePercent)) {
                title = "Great job!"
                description = `You are getting there.You have completed ${completePercent.toFixed(2)} of your goals today.`
            }
            if (completePercent < 1) {
                const hitProgressNotificationLastSent = new Date(user.hitProgressNotificationLastSent)
                if (hitProgressNotificationLastSent.getFullYear() <= new Date().getFullYear()
                    && hitProgressNotificationLastSent.getMonth() <= new Date().getMonth()
                    && hitProgressNotificationLastSent.getDate() < new Date().getDate()) {
                    title = "Ready to Make Progress Today?"
                    description = `Let's get started on your goals!`

                    user.hitProgressNotificationLastSent = new Date()
                    await user.save()
                }
            }

            // need to add per day you should only send one notification
            if (title) {
                // send notification to the user
                const sendNotificationResult = await sendNotification({
                    title: title,
                    description: description,
                    userId: userId,
                    belongTo: "goal"
                })

                if (!sendNotificationResult) {
                    console.log("notification not sent when created goal", sendNotificationResult)
                }
            }

            if (role === "user") {

                const dailyQuoteSent = new Date(user.dailyQuoteSent)
                if (dailyQuoteSent.getFullYear() <= new Date().getFullYear()
                    && dailyQuoteSent.getMonth() <= new Date().getMonth()
                    && dailyQuoteSent.getDate() < new Date().getDate()) {
                    const randomIndex = Math.floor(Math.random() * messages.length);
                    // send notification to the user
                    const sendNotificationResult = await sendNotification({
                        title: `Daily quote`,
                        description: messages[randomIndex],
                        userId: userId,
                        belongTo: "quote"
                    })

                    user.dailyQuoteSent = new Date()
                    user.save()

                    if (!sendNotificationResult) {
                        console.log("notification not sent when created goal", sendNotificationResult)
                    }
                }

            }
            user.goalProgress = completePercent.toFixed(2)
            await user.save()
        }

        return res.status(200).json({
            status: "success",
            totalTodayGoals: updatedGoals,
            completedGoalsLength,
            completePercent: completePercent.toFixed(2),
            toStartPercent: (100 - completePercent).toFixed(2)
        });

    } catch (error) {
        console.error('Error fetching daily goal progress:', error);
        res.status(500).json({ status: "error", message: "Failed to get daily goal progress" + error });
    }
};
