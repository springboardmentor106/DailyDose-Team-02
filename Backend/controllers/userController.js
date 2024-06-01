import User from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../config/emailConfig.js';
import OTP from '../models/otpModel.js';
import Caretaker from '../models/caretakerModel.js';
import { generateNumberOTP } from '../config/generateOtp.js';

export const newUserEmailOtp = async (req, res) => {
    try {
        const { email, role } = req.body;
        // Check if the email is already registered
        if (await isEmailRegistered(email, role)) {
            return res.status(400).json({ status: "failed", message: "Email already registered" });
        }

        // Generate OTP
        const otp = generateNumberOTP(6);

        // Save or update OTP in the database
        const otpSaved = await saveOrUpdateOtp(email, otp);
        if (!otpSaved) {
            return res.status(500).json({ status: "failed", message: "Error occurred in capturing OTP" });
        }

        // Send OTP email
        const sentEmail = await sendOtpEmail(email, otp);
        if (!sentEmail) {
            return res.status(500).json({ status: "failed", message: "Email not sent. Try again!" });
        }

        console.log(`OTP sent. Email: ${email}, OTP: ${otp}`);
        res.status(200).json({ status: "success", message: "OTP sent to your Email" });

    } catch (error) {
        console.error("Error in sending OTP:", error);
        res.status(500).json({ status: "error", message: "Failed to send OTP. Please try again." });
    }
};
const isEmailRegistered = async (email, role) => {
    if (role !== "caretaker") {
        const user = await User.findOne({ email });
        if (user) {
            console.log("User UUID:", user.uuid);
            return true;
        }
    } else {
        const caretaker = await Caretaker.findOne({ email });
        if (caretaker) {
            console.log("Caretaker UUID:", caretaker.uuid);
            return true;
        }
    }
    return false;
};
const sendOtpEmail = async (email, otp) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "DailyDose - Validate Email to register",
            html: `<p>Use this OTP to validate your email.</p><h2>${otp}</h2>`,
        });
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        return null;
    }
};
const saveOrUpdateOtp = async (email, otp) => {
    try {
        const existingOtp = await OTP.findOne({ email });
        console.log("Existing OTP:", existingOtp);

        if (existingOtp) {
            const updatedOtp = await OTP.updateOne({ email }, { $set: { otp, verified: false } });
            console.log("Updated OTP:", updatedOtp);
            return updatedOtp;
        } else {
            const newOtp = new OTP({ email, otp });
            const savedOtp = await newOtp.save();
            console.log("Saved OTP:", savedOtp);
            return savedOtp;
        }
    } catch (error) {
        console.error("Error in saveOrUpdateOtp:", error);
        throw new Error("Error occurred while saving or updating OTP");
    }
};


// export const getUserDetailsByUuidAndRole = async (req, res) => {
//     try {
//         const { uuid, role } = req.params;

//         let user;
//         if (role !== "caretaker") {
//             user = await User.findOne({ uuid }).select("-password");
//         } else {
//             user = await Caretaker.findOne({ uuid }).select("-password");
//         }

//         if (!user) {
//             return res.status(404).json({ status: "failed", message: "User not found" });
//         }

//         console.log("Found User/Caretaker UUID:", user.uuid); // Log found user/caretaker UUID
//         res.status(200).json({ status: "success", user });
//     } catch (error) {
//         console.error("Error fetching user details:", error);
//         return res.status(500).json({ status: "error", message: "Failed to fetch user details" });
//     }
// };


// Create User
export const userRegistration = async (req, res) => {
    try {
        const { enteredOtp, firstname, lastname, email, gender, age, password, role, ...body } = req.body;
        console.log("Request body:", req.body);

        const savedOtp = await OTP.findOne({ email });
        console.log("Saved OTP:", savedOtp);

        if (!savedOtp) {
            return res.status(400).json({ status: "failed", message: "OTP not found or has expired" });
        }

        if (role !== "caretaker") {
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ status: "failed", message: "Email already registered" });
            }
        } else {
            const caretaker = await Caretaker.findOne({ email });
            if (caretaker) {
                return res.status(400).json({ status: "failed", message: "Email already registered" });
            }
        }

        console.log("Entered OTP:", String(enteredOtp), "Saved OTP:", savedOtp.otp);

        if (!savedOtp.otp) {
            return res.status(500).json({ status: "failed", message: 'Request for OTP again' });
        }

        if (String(enteredOtp) !== savedOtp.otp) {
            return res.status(400).json({ status: "failed", message: "Incorrect OTP, please try again" });
        }

        const otpUpdateResponse = await OTP.findOneAndUpdate({ email }, { $set: { verified: true, otp: "" } });
        if (!otpUpdateResponse) {
            return res.status(500).json({ status: "failed", message: "Status update failed for OTP" });
        }

        console.log("OTP update response:", otpUpdateResponse);

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userData = {
            firstname,
            lastname,
            email,
            gender,
            age,
            password: hashPassword,
            uuid: uuidv4(),
            role,
            ...body
        };

        let token;
        if (role !== "caretaker") {
            const userDoc = new User(userData);
            const savedUser = await userDoc.save();
            if (!savedUser) {
                return res.status(500).json({ status: "failed", message: "Internal server error. User not created" });
            }
            token = jwt.sign({ userID: savedUser.uuid, role: "user" }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });
        } else {
            const caretaker = new Caretaker(userData);
            const savedCaretaker = await caretaker.save();
            if (!savedCaretaker) {
                return res.status(500).json({ status: "failed", message: "Internal server error. Caretaker not created" });
            }
            token = jwt.sign({ userID: savedCaretaker.uuid, role: "caretaker" }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });
        }

        res.status(201).json({ status: "success", message: "Registered Successfully", token });

    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ status: "error", message: "An error occurred during registration" + error });
    }
};


// Read User
export const readUserDetail = async (req, res) => {
    try {
        const { userId, role } = req;

        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        if (!role) {
            return res.status(404).json({ status: "failed", message: "role not captured" });
        }

        let user;
        if (role !== "caretaker") {
            user = await User.findOne({ uuid: userId });
            if (!user) {
                return res.status(400).json({ status: "failed", message: "Email not found" });
            }
        } else {
            user = await Caretaker.findOne({ uuid: userId });
            if (!user) {
                return res.status(400).json({ status: "failed", message: "Email not found" });
            }
        }

        return res.status(200).json({ status: "success", user });
    } catch (error) {
        console.error("Error in reading user:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
};


// Update User
export const updateUser = async (req, res) => {
    try {
        const { userId, role } = req;
        const body = req.body;

        // console.log("Request body:", req.body);

        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        if (!role) {
            return res.status(404).json({ status: "failed", message: "role not captured" });
        }

        let user;
        let updateUser;
        if (role === "user") {
            user = await User.findOne({ uuid: userId });            
            // console.log(user)

            if (!user) {
                return res.status(400).json({ status: "failed", message: "Email not found" });
            }

            // body.allergies = user.allergies.concat(body.allergies)
            // body.diseases = user.diseases.concat(body.diseases)

            updateUser = await User.findByIdAndUpdate(user._id, body, { new: true })

            if (!updateUser) {
                return res.status(400).json({ status: "failed", message: "Error in updating" });
            }
        } else {
            user = await Caretaker.findOne({ uuid: userId });
            // console.log(user)

            if (!user) {
                return res.status(400).json({ status: "failed", message: "Email not found" });
            }

            // body.allergies = user.allergies.concat(body.allergies)
            // body.diseases = user.diseases.concat(body.diseases)

            updateUser = await Caretaker.findByIdAndUpdate(user._id, body, { new: true })

            if (!updateUser) {
                return res.status(400).json({ status: "failed", message: "Error in updating" });
            }
        }
        res.status(200).json({ status: "success", message: "User updated successfully" });
    } catch (error) {
        console.error("Error in updating user:", error);
        res.status(500).json({ status: "error", message: "An error occurred during updating user information" });
    }
};


// Delete User
export const deleteUser = async (req, res) => {
    try {
        const { userId, role } = req;

        if (!userId) {
            return res.status(404).json({ status: "failed", message: "uuid not captured" });
        }

        if (!role) {
            return res.status(404).json({ status: "failed", message: "role not captured" });
        }

        let user;
        if (role !== "caretaker") {
            user = await User.findOneAndDelete({ uuid: userId });
            if (!user) {
                return res.json({ message: "Email not found" });
            }
        } else {
            user = await Caretaker.findOneAndDelete({ uuid: userId });
            if (!user) {
                return res.json({ message: "Email not found" });
            }
        }

        res.status(200).json({ status: "success", message: "User deleted successfully" });
    } catch (error) {
        console.error("Error in deleting user:", error);
        res.status(500).json({ status: "error", message: "An error occurred during deletion" });
    }
};


// Login
export const userLogin = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (email && password) {
            let user;
            if (role != "caretaker") {
                user = await User.findOne({ email: email });
            } else {
                user = await Caretaker.findOne({ email: email });
            }
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password);
                if ((user.email === email) && isMatch) {
                    console.log(user);
                    // JWT Token Generate
                    const token = jwt.sign({ userID: user.uuid, role: role }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

                    res.send({ "status": "success", "message": "Login Successfully", "token": token });
                } else {
                    res.send({ "status": "failed", "message": "Email or Password is Invalid" });
                }
            } else {
                res.send({ "status": "failed", "message": "Email or Password is Invalid" });
            }
        } else {
            res.send({ "status": "failed", "message": "You are not a Registered User" });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": "failed", "message": "Unable to login" });
    }
}

// Change User Password If Know and want to Change
export const changeUserPassword = async (req, res) => {
    try {
        const { password, password_confirm } = req.body;

        if (password && password_confirm) {
            if (password !== password_confirm) {
                res.send({ "status": "failed", "message": "New Password and Confirm New Password not match" })
            } else {
                const salt = await bcrypt.genSalt(10)
                const newHashPassword = await bcrypt.hash(password, salt);
                await User.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
                res.send({ "status": "Success", "message": "Password Changed Successfully" })
            }

        } else {
            res.send({ "status": "failed", "message": "All Fields are Required" });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": "failed", "message": "Unable to login" });
    }
}

// Assign User to Caretaker
export const assignUserToCaretaker = async (req, res) => {
    const { userUuid, caretakerId } = req.body;

    try {
        const user = await User.findOne({ uuid: userUuid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.caretaker) {
            return res.status(400).json({ message: 'User is already assigned to a caretaker' });
        }

        user.caretaker = caretakerId;
        await user.save();

        res.json({ message: 'User successfully assigned to you' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Forget Password - Reset through email
export const userPasswordResetEmail = async (req, res) => {
    const { email, role } = req.body

    if (email) {
        // const user = await User.findOne({ email: email })
        if (role !== "caretaker") {
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ status: "failed", message: "User not found." });
            }
        } else {
            const caretaker = await Caretaker.findOne({ email: email });
            if (!caretaker) {
                return res.status(400).json({ status: "failed", message: "Caretaker not found" });
            }
        }


        const otp = generateNumberOTP(6);
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "DailyDose - Validate Email to register",
            html: `<p>Use this otp to validate your email.</p></br><h2>${otp}</h2>`
        });

        const UserOtp = await OTP.findOne({ email: email });

        if (UserOtp) {
            const updatedOtp = await OTP.updateOne({ email: email }, { $set: { otp: otp, verified: false } });
            if (!updatedOtp) {
                return res.status(500).json({ status: "failed", message: "Error occured in capturing OTP" })
            }
        } else {
            const savedOtp = await OTP.create({ email, otp });
            if (!savedOtp) {
                return res.status(500).json({ status: "failed", message: "Error occured in capturing OTP" })
            }
        }
        console.log(otp);
        res.status(200).json({ status: "success", message: "OTP sent to your Email" });
    } else {
        res.send({ "status": "failed", "message": "Email Field is Required" })
    }
}


// validate the otp
export const validateOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const savedOtp = await OTP.findOne({ email });
        if (!savedOtp) {
            return res.status(500).json({ status: "failed", message: 'Some error happened. Request for otp again.' })
        }
        if (savedOtp?.otp === '') {
            return res.status(500).json({ status: "failed", message: 'Request for otp again.' })
        }

        if (String(otp) === savedOtp.otp) {
            const otpUpdateResponse = await OTP.findOneAndUpdate({ email }, { $set: { verified: true, otp: "" } });
            if (!otpUpdateResponse) {
                return res.status(500).json({ status: "failed", message: "status update failed for OTP" });
            } else {
                return res.status(200).json({ status: "success", message: "Otp validated.Reset your password now" });
            }
        } else {
            return res.status(200).json({ status: "failed", message: "Incorrect otp" });
        }
    } catch (error) {
        console.error('Error rendering resetPassword:', error);
        return res.status(500).send('Internal Server Error');
    }
}

// update password
export const userPasswordReset = async (req, res) => {
    const { password, email, role } = req.body;

    try {
        let user;
        if (role != "caretaker") {
            user = await User.findOne({ email });
        } else {
            user = await Caretaker.findOne({ email });
        }

        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let savedUser
        // Update hashed user's password in database
        if (role != "caretaker") {
            savedUser = await User.findOneAndUpdate({ uuid: user.uuid }, { $set: { password: hashedPassword } });
        } else {
            savedUser = await Caretaker.findOneAndUpdate({ uuid: user.uuid }, { $set: { password: hashedPassword } });
        }
        if (!savedUser) {
            return res.status(500).json({ status: "failed", message: "Error occurred. Password not updated. Please try again" })
        }
        return res.status(200).json({ status: "success", message: "Password reset successfully" });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ status: "failed", message: "Internal Server Error" });
    }
};