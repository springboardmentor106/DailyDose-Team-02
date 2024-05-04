import Caretaker from '../models/caretakerModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class CaretakerController {
    static caretakerRegistration = async (req, res) => {
        const { firstname, lastname, email, gender, age, password, password_confirm } = req.body;
        const caretaker = await Caretaker.findOne({ email: email });
        if (caretaker) {
            res.send({ "status": "failed", "message": "Email already present" });
        } else {
            if (firstname && lastname && email && gender && age && password && password_confirm) {
                if (password === password_confirm) {
                    try {
                        const salt = await bcrypt.genSalt(10);
                        const hashPassword = await bcrypt.hash(password, salt);
                        const caretakerDoc = new Caretaker({
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            gender: gender,
                            age: age,
                            password: hashPassword
                        });
                        await caretakerDoc.save();
                        res.status(201).send({ "status": "success", "message": "Registered Successfully" });
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
    };

    static caretakerLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const caretaker = await Caretaker.findOne({ email: email });
                if (caretaker != null) {
                    const isMatch = await bcrypt.compare(password, caretaker.password); // Use caretaker.password instead of Caretaker.password
                    if ((caretaker.email === email) && isMatch) {
                        res.send({ "status": "success", "message": "Login Successfully" });
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
    };
}

export default CaretakerController;
