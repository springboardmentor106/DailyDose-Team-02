import User from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../config/emailConfig.js';
import OTP from '../models/otpModel.js';
import path from 'path';
import Caretaker from '../models/caretakerModel.js';
import { generateNumberOTP } from '../config/generateOtp.js';
import {
    newUserEmailOtpSchema,
    userRegistrationSchema,
    userLoginSchema,
    changeUserPasswordSchema,
    validateOtpSchema,
    userPasswordResetEmailSchema,
    userPasswordResetSchema,
} from '../validations/userValidation.js';

class UserController {

    static newUserEmailOtp = async (req, res) => {
        try {
            // validation
            const { error, value } = newUserEmailOtpSchema.validate(req.body)
            if (error) {
                return res.status(400).json({ status: "failed", message: error.message })
            }

            const { email, role } = value;

            if (role !== "caretaker") {
                const user = await User.findOne({ email: email });
                if (user) {
                    console.log("User UUID:", user.uuid); // Log user UUID
                    return res.status(400).json({ status: "failed", message: "Email already registered" });
                }
            } else {
                const caretaker = await Caretaker.findOne({ email: email });
                if (caretaker) {
                    console.log("Caretaker UUID:", caretaker.uuid); // Log caretaker UUID
                    return res.status(400).json({ status: "failed", message: "Email already registered" });
                }
            }

            const otp = generateNumberOTP(6);
            const sentEmail = await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: "DailyDose - Validate Email to register",
                html: `<p>Use this otp to validate your email.</p></br><h2>${otp}</h2>`
            });

            if (!sentEmail) {
                return res.status(500).json({ status: "failed", message: "Email not send. Try again!" })
            }

            const UserOtp = await OTP.findOne({ email: email });

            if (UserOtp) {
                const updatedOtp = await OTP.updateOne({ email: email }, { $set: { otp: otp, verified: false } });
                if (!updatedOtp) {
                    return res.status(500).json({ status: "failed", message: "Error occurred in capturing OTP" })
                }
            } else {
                const savedOtp = await OTP.create({ email, otp });
                if (!savedOtp) {
                    return res.status(500).json({ status: "failed", message: "Error occurred in capturing OTP" })
                }
            }

            console.log(otp);

            res.status(200).json({ status: "success", message: "OTP sent to your Email" });

        } catch (error) {
            console.error("Error in sending OTP:", error);
            return res.status(500).json({ status: "error", message: "Failed to send OTP. Please try again." });
        }
    };

    static getUserDetailsByUuidAndRole = async (req, res) => {
        try {
            const { uuid, role } = req.params;

            let user;
            if (role !== "caretaker") {
                user = await User.findOne({ uuid }).select("-password");
            } else {
                user = await Caretaker.findOne({ uuid }).select("-password");
            }

            if (!user) {
                return res.status(404).json({ status: "failed", message: "User not found" });
            }

            console.log("Found User/Caretaker UUID:", user.uuid); // Log found user/caretaker UUID
            res.status(200).json({ status: "success", user });
        } catch (error) {
            console.error("Error fetching user details:", error);
            return res.status(500).json({ status: "error", message: "Failed to fetch user details" });
        }
    };

    static userRegistration = async (req, res) => {
        try {
            // Validation
            const { error, value } = userRegistrationSchema.validate(req.body);

            if (error) {
                return res.status(400).json({ status: "failed", message: error.message });
            }

            const { enteredOtp, firstname, lastname, email, gender, age, password, role } = value;
            // console.log(req.body)
            // console.log(value)
            const savedOtp = await OTP.findOne({ email });
            console.log("saved otp", savedOtp)

            if (!savedOtp) {
                return res.status(400).json({ status: "failed", message: "OTP not found or has expired" });
            }

            if (role !== "caretaker") {
                const user = await User.findOne({ email: email });
                if (user) {
                    return res.status(400).json({ status: "failed", message: "Email already registered" });
                }
            } else {
                const caretaker = await Caretaker.findOne({ email: email });
                if (caretaker) {
                    return res.status(400).json({ status: "failed", message: "Email already registered" });
                }
            }
            console.log(String(enteredOtp), savedOtp.otp);
            if (savedOtp.otp === '') {
                return res.status(500).json({ status: "failed", message: 'User already exist or some error happened. Request for otp again.' })
            }
            if (String(enteredOtp) === savedOtp.otp) {
                const otpUpdateResponse = await OTP.findOneAndUpdate({ email }, { $set: { verified: true, otp: "" } });
                if (!otpUpdateResponse) {
                    res.status(500).json({ status: "failed", message: "status update failed for OTP" });
                }
                console.log(otpUpdateResponse);

                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);

                const body = {
                    firstname,
                    lastname,
                    email,
                    gender,
                    age,
                    password: hashPassword,
                    uuid: uuidv4(), // Assign a new UUID
                }
                let token;
                if (role !== "caretaker") {
                    const userDoc = new User(body);
                    const savedUser = await userDoc.save();
                    if (!savedUser) {
                        return res.status(500).json({ status: "failed", message: "Internal server error. User not created" })
                    }
                    // JWT Token Generation
                    token = jwt.sign({ userID: savedUser.uuid }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });
                } else {
                    const caretakerDoc = new Caretaker(body)
                    const savedCaretaker = await caretakerDoc.save();
                    if (!savedCaretaker) {
                        return res.status(500).json({ status: "failed", message: "Internal server error. Caretaker not created" })
                    }
                    // JWT Token Generation
                    token = jwt.sign({ userID: savedCaretaker.uuid }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });
                }

                res.status(201).json({ status: "success", message: "Registered Successfully", token });

            } else {
                return res.status(400).json({ status: "failed", message: "Incorrect OTP, please try again" });
            }
        } catch (error) {
            console.error("Error in OTP verification:", error);
            return res.status(500).json({ status: "error", message: "An error occurred while verifying OTP" });
        }
    };

    // Login
    static userLogin = async (req, res) => {
        try {
            // validation
            const { error, value } = userLoginSchema.validate(req.body)
            if (error) {
                return res.status(400).json({ status: "failed", message: error.message })
            }

            const { email, password, role } = value;
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

                        // JWT Token Generate
                        // const token = jwt.sign({ userID: user.uuid }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });
                        const token = jwt.sign({ userID: user.uuid + 'jyjggdhtrhcfmhgvhgfrt' }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

                        // res.send({ "status": "success", "message": "Login Successfully", "token": token });
                        res.send({ "status": "success", "message": "Login Successfully", "token": token, "userID": user.uuid });
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
    static changeUserPassword = async (req, res) => {
        try {
            // Validation
            const { error, value } = changeUserPasswordSchema.validate(req.body)
            if (error) {
                return res.status(400).json({ status: "failed", message: error.message })
            }

            const { password, password_confirm } = value
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
    static assignUserToCaretaker = async (req, res) => {
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
    static userPasswordResetEmail = async (req, res) => {
        // validation
        const { error, value } = userPasswordResetEmailSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ status: "failed", message: error.message })
        }

        const { email, role } = value
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
    static validateOtp = async (req, res) => {
        try {
            // validation
            const { error, value } = validateOtpSchema.validate(req.body)
            if (error) {
                return res.status(400).json({ status: "failed", message: error.message })
            }

            const { email, otp } = value
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
    static userPasswordReset = async (req, res) => {
        // validation
        const { error, value } = userPasswordResetSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ status: "failed", message: error.message })
        }

        const { password, email, role } = value;

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

}

export default UserController;