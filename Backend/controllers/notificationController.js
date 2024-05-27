import Notification from '../models/notificationModel';
import User from '../models/userModel';



export const createNotification = async (req, res) => {
    try {
        const { userId, title, description, belongTo } = req.body;

        if (!userId || !title || !description || !belongTo) {
            return res.status(400).json({ status: "failed", message: "All fields are required" });
        }

        const newNotificationDetail = {
            id: Date.now(),  // Or some other logic to generate a unique id
            title,
            description,
            belongTo
        };

        let userNotification = await Notification.findOne({ userId });

        if (!userNotification) {
            userNotification = new Notification({
                userId,
                notification: [newNotificationDetail]
            });
        } else {
            userNotification.notification.push(newNotificationDetail);
        }

        const savedNotification = await userNotification.save();
        return res.status(201).json({ status: "success", data: savedNotification });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
};

// Get all notifications for a user
export const getNotifications = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ status: "failed", message: "User ID is required" });
        }

        const notifications = await Notification.find({ userId });
        return res.status(200).json({ status: "success", data: notifications });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
};

// Update a notification
export const updateNotification = async (req, res) => {
    try {
        const { uuid } = req.params;
        const { title, description, actionTaken } = req.body;

        const updatedNotification = await Notification.findOneAndUpdate(
            { "notification.uuid": uuid },
            { 
                $set: {
                    "notification.$.title": title,
                    "notification.$.description": description,
                    "notification.$.actionTaken": actionTaken
                }
            },
            { new: true }
        );

        if (!updatedNotification) {
            return res.status(404).json({ status: "failed", message: "Notification not found" });
        }

        return res.status(200).json({ status: "success", data: updatedNotification });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
    try {
        const { uuid } = req.params;

        const updatedNotification = await Notification.findOneAndUpdate(
            { "notification.uuid": uuid },
            { $pull: { notification: { uuid } } },
            { new: true }
        );

        if (!updatedNotification) {
            return res.status(404).json({ status: "failed", message: "Notification not found" });
        }

        return res.status(200).json({ status: "success", message: "Notification deleted successfully" });
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message });
    }
};

// pls check and update the changes


// Get a single notification by ID
export const getNotification = async (req, res) => {
    try {
      const notification = await Notification.findById(req.params.id);
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      res.json(notification);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Notify caretakers about a past due reminder
  export const notifyPastDueReminder = async (reminder) => {
    try {
      const users = await User.find({ role: 'caretaker' });
      users.forEach(async (user) => {
        const newNotificationDetail = {
          id: Date.now(), // Generate a unique id
          title: 'Past Due Reminder',
          description: `${user.name} has a past due reminder for ${reminder.title}. Please check your dashboard for more details.`,
          belongTo: user._id
        };
  
        let userNotification = await Notification.findOne({ userId: user._id });
  
        if (!userNotification) {
          userNotification = new Notification({
            userId: user._id,
            notification: [newNotificationDetail]
          });
        } else {
          userNotification.notification.push(newNotificationDetail);
        }
  
        await userNotification.save();
      });
    } catch (error) {
      console.error('Error notifying past due reminder:', error);
    }
  };
  
  // Notify caretakers about uncompleted goals
  export const notifyUncompleteGoals = async () => {
    try {
      const users = await User.find({ role: 'caretaker' });
      users.forEach(async (user) => {
        const newNotificationDetail = {
          id: Date.now(), // Generate a unique id
          title: 'Uncomplete Goals',
          description: `${user.name} has unfinished goals. Please check your dashboard for more details.`,
          belongTo: user._id
        };
  
        let userNotification = await Notification.findOne({ userId: user._id });
  
        if (!userNotification) {
          userNotification = new Notification({
            userId: user._id,
            notification: [newNotificationDetail]
          });
        } else {
          userNotification.notification.push(newNotificationDetail);
        }
  
        await userNotification.save();
      });
    } catch (error) {
      console.error('Error notifying uncomplete goals:', error);
    }
  };
  
  // Notify caretakers about a new entry
  export const notifyNewEntry = async () => {
    try {
      const users = await User.find({ role: 'caretaker' });
      users.forEach(async (user) => {
        const newNotificationDetail = {
          id: Date.now(), // Generate a unique id
          title: 'New Entry',
          description: `${user.name} has a new entry. Please check your dashboard for more details.`,
          belongTo: user._id
        };
  
        let userNotification = await Notification.findOne({ userId: user._id });
  
        if (!userNotification) {
          userNotification = new Notification({
            userId: user._id,
            notification: [newNotificationDetail]
          });
        } else {
          userNotification.notification.push(newNotificationDetail);
        }
  
        await userNotification.save();
      });
    } catch (error) {
      console.error('Error notifying new entry:', error);
    }
  };