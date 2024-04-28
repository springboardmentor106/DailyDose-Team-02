import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../config/emailConfig.js';


class userController {
    static userRegistration = async (req, res) => {
        try {
            const { firstname, lastname, email, gender, age, password, password_confirm, phoneNumber, address, country, pincode } = req.body;
            const user = await User.findOne({ email: email });
            if (user) {
                res.send({ "status": "failed", "message": "Email already present" });
            } else {
                if (firstname && lastname && email && gender && age && password && password_confirm) {
                    if (password === password_confirm) {
                        try {
                            const salt = await bcrypt.genSalt(10);
                            const hashPassword = await bcrypt.hash(password, salt);
                            const userDoc = new User({
                                firstname: firstname,
                                lastname: lastname,
                                email: email,
                                gender: gender,
                                age: age,
                                password: hashPassword,
                                phoneNumber: phoneNumber,
                                address: address,
                                country: country,
                                pincode: pincode
                            });
                            await userDoc.save();

                            // JWT Token Generate
                            const token = jwt.sign({ userID: userDoc._id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

                            res.status(201).send({ "status": "success", "message": "Registered Successfully", "token": token });
                        } catch (error) {
                            console.log(error);
                            res.send({ "status": "failed", "message": "Unable to Register" });
                        }
                    } else {
                        res.send({ "status": "failed", "message": "Password and Confirm password not matched" });
                    }
                } else {
                    res.send({ "status": "failed", "message": "All fields required" });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
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
                res.send({ "status": "success", "message": "Password Reset Email Sent..  Check Your Email", "info": info })
            } else {
                res.send({ "status": "failed", "message": "Email Doesn't exist" })
            }
        } else {
            res.send({ "status": "failed", "message": "Email Field is Required" })
        }
    }

    static userPasswordReset = async (req, res) => {
        const { password, password_confirm } = req.body
        const { id, token } = req.params
        // console.log(`id: ${id}, token: ${token}`);
        const user = await User.findById(id)
        // console.log(user);
        const new_secret = user._id + process.env.JWT_SECRET_KEY
        try {
            jwt.verify(token, new_secret)
            if (password && password_confirm) {
                if (password !== password_confirm) {
                    res.send({ "status": "failed", "message": "New Password and Confirm Password not matched" })
                } else {
                    const salt = await bcrypt.genSalt(10);
                    const newHashPassword = await bcrypt.hash(password, salt);
                    await User.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
                    res.send({ "status": "success", "message": "Password reset Successfully!" })
                }
            } else {
                res.send({ "status": "failed", "message": "All Fields  Required" })
            }
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Token is not Valid" })
        }
    }
}

export default userController;