import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
    static userRegistration = async (req, res) => {
        try {
            const { firstname, lastname, email, gender, age, password, password_confirm } = req.body;
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
                                password: hashPassword
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
                     
                      res.send({ "status": "success", "message": "Login Successfully","token":token });
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
    static changeUserPassword = async(req,res)=>{
      const {password, password_confirm} = req.body
      if(password && password_confirm){
        if(password !== password_confirm) {
          res.send({"status":"failed", "message": "New Password and Confirm New Password not match"})
        }else{
          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt);
          await User.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
          res.send({"status":"Success", "message": "Password Changed Successfully"})
        }

      }else{
        res.send({"status":"failed", "message": "All fields are Required"})
        
      }
    }
    static loggedUser = async (req, res) => {
        res.send({ "user": req.user })
    }
    // Fporget Password
    
}

export default UserController;
