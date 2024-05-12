import User from '../models/userModel.js';
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
                    return res.status(400).json({ status: "failed", message: "Email already registered" });
                }
            } else {
                const caretaker = await Caretaker.findOne({ email: email });
                if (caretaker) {
                    return res.status(400).json({ status: "failed", message: "Email already registered" });
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

        } catch (error) {
            console.error("Error in sending OTP:", error);
            return res.status(500).json({ status: "error", message: "Failed to send OTP. Please try again." });
        }
    };

    // Registration
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
                        const token = jwt.sign({ userID: user.uuid }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

                        res.send({ "status": "success", "message": "Login Successfully", "token": token });
                    } else {
                        res.send({ "status": "failed", "message": "Email or Password is Invalid" });
                    }
                } else {
                    res.send({ "status": "failed", "message": "You are not a Registered User" });
                }
            } else {
                res.send({ "status": "failed", "message": "All Fields are Required" });
            }
        } catch (error) {
            console.log(error);
            res.send({ "status": "failed", "message": "Unable to login" });
        }
    }

    // Change User Password If Know and want to Change
    static changeUserPassword = async (req, res) => {
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
            res.send({ "status": "failed", "message": "All fields are Required" })

        }
    }
    static loggedUser = async (req, res) => {
        res.send({ "user": req.user })
    }

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

    static resetPasswordPage = async (req, res) => {
        try {
            const id = userID;
            const token = userToken;
            const port = process.env.PORT;

            if (!userID || !userToken) {
                throw new Error('User or token not provided');
            }
            const filePath = path.join(process.env.DIR_PATH, 'pages', 'resetPassword')
            console.log(filePath)
            res.render(filePath, { id, token, port });
        } catch (error) {
            console.error('Error rendering resetPassword:', error);
            res.status(500).send('Internal Server Error');
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
            if (savedOtp.otp === '') {
                return res.status(500).json({ status: "failed", message: 'Some error happened. Request for otp again.' })
            }
            if (String(otp) === savedOtp.otp) {
                const otpUpdateResponse = await OTP.findOneAndUpdate({ email }, { $set: { verified: true, otp: "" } });
                if (!otpUpdateResponse) {
                    return res.status(500).json({ status: "failed", message: "status update failed for OTP" });
                } else {
                    return res.status(200).json({ status: "success", message: "Otp validated.Reset your password now" });
                }
            } else {
                return res.status(200).json({ status: "success", message: "Incorrect otp" });
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
    // get all userDetails
    static getAllUserDetails = async (req, res) => {
        try {
           const all_users= await User.find();
           return res.status(200).json(all_users);

        } catch (error) {
            console.error("Error fetching user details:", error);
            return res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    };

   static editProfile=async(req,res)=>{
    try{
        const {uuid,firstname,lastname,email,phone}=req.body;
        const user=await User.findOne({uuid:uuid});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        if(!!firstname)
        user.firstname=firstname;
        if(!!lastname)
        user.lastname=lastname;
        if(!!email)
        user.email=email;
        if(!!phone)
        user.phone=phone;
        await user.save();
        return res.status(200).json({message:"Profile edited successfully"});
    }
    catch(error){
        console.log(error);
        return res.status(400).json({message:"Error editing profile"});
    }
   }
}

export default UserController;