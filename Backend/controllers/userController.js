import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../config/emailConfig.js';
import OTP from '../models/otpModel.js';

function generateOtp(len) {
    const range = Math.pow(10, len) - 1
    return String(Math.floor(Math.random() * range))
}

class UserController {

    static newUserEmailOtp = async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email: email });
            if (user) {
                return res.status(400).json({ status: "failed", message: "Email already registered" });
            }

            const otp = generateOtp(6);

            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: email,
                subject: "DailyDose - Validate Email to register",
                html: `<p>Use this otp to validate your email.</p></br><h2>${otp}</h2>`
            });

            const savedOtp = await OTP.create({ email, otp });
            if (!savedOtp) {
                return res.status(500).json({ status: "failed", message: "Error occured in capturing OTP" })
            }
            console.log(savedOtp);

            res.status(200).json({ status: "success", message: "OTP sent to your Email" });

        } catch (error) {
            console.error("Error in sending OTP:", error);
            return res.status(500).json({ status: "error", message: "Failed to send OTP. Please try again." });
        }
    };

    static userRegistration = async (req, res) => {
        try {
            const { enteredOtp, firstname, lastname, email, gender, age, password, phoneNumber, address, country, pincode } = req.body;

            console.log(req.body)
            const savedOtp = await OTP.findOne({ email });

            if (!savedOtp) {
                return res.status(400).json({ status: "failed", message: "OTP not found or has expired" });
            }

            console.log(String(enteredOtp), savedOtp.otp);

            if (String(enteredOtp) === savedOtp.otp) {
                const otpUpdateResponse = await OTP.findOneAndUpdate({ email }, { $set: { verified: true, otp: "" } });
                if (!otpUpdateResponse) {
                    res.status(500).json({ status: "failed", message: "status update failed for OTP" });
                }
                console.log(otpUpdateResponse);

                if (!(firstname && lastname && email && gender && age && password)) {
                    return res.status(400).json({ status: "failed", message: "All fields are required" });
                }

                // Checking for existing user
                const existingUser = await User.findOne({ email })
                if (existingUser) {
                    return res.status(400).json({ status: "failed", message: "User already registered" });
                }

                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);

                const userDoc = new User({
                    firstname,
                    lastname,
                    email,
                    gender,
                    age,
                    password: hashPassword,
                    phoneNumber,
                    address,
                    country,
                    pincode
                });

                await userDoc.save();

                // JWT Token Generation
                const token = jwt.sign({ userID: userDoc._id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

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
            const { email, password } = req.body;
            if (email && password) {
                const user = await User.findOne({ email: email });
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if ((user.email === email) && isMatch) {

                        // JWT Token Generate
                        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

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
        const { password, password_confirm } = req.body
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

    // Forget Password
    static UserPasswordResetEmail = async (req, res) => {
        const { email } = req.body
        if (email) {
            const user = await User.findOne({ email: email })
            if (user) {
                const secret = user._id + process.env.JWT_SECRET_KEY

                const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '30m' })
                //  Frontend Link for Reset Pass
                const link = `http://127.0.0.1:${process.env.PORT}/api/user/reset-password/${user._id}/${token}`
                //   Route for frontend e.g-> api/user/reset/:id/:token
                console.log(link);

                // Send Email
                let info = await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: user.email,
                    subject: "DailyDose - Password Reset Link",
                    html: `<a href=${link}>Click Here</a> to Reset Your Password. Password reset link will expire in 30 minutes.`
                })
                // console.log(info);
                res.redirect(`http://127.0.0.1:${process.env.PORT}/api/user/update-password`)
            } else {
                res.send({ "status": "failed", "message": "Email Doesn't exist" })
            }
        } else {
            res.send({ "status": "failed", "message": "Email Field is Required" })
        }
    }

    static userPasswordReset = async (req, res) => {
        const { password, password_confirm } = req.body;
        const { id, token } = req.params;
    
        try {
            if (!password || !password_confirm) {
                return res.status(400).json({ status: "failed", message: "Both New Password and Confirm Password are required" });
            }
    
            if (password !== password_confirm) {
                return res.status(400).json({ status: "failed", message: "New Password and Confirm Password do not match" });
            }
    
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ status: "failed", message: "User not found" });
            }
    
            const secret = `${user._id}${process.env.JWT_SECRET_KEY}`;
    
            jwt.verify(token, secret, async (err, decoded) => {
                if (err) {
                    return res.status(401).json({ status: "failed", message: "Token is not valid" });
                }
    
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
    
                // Update hashed user's password in database
                await User.findByIdAndUpdate(user._id, { $set: { password: hashedPassword } });
    
                return res.status(200).json({ status: "success", message: "Password reset successfully" });
            });
    
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ status: "failed", message: "Internal Server Error" });
        }
    };


}

export default UserController;