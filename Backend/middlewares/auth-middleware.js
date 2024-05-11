import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

var checkUserAuth = async(req, res, next)=>{
    let token 
    const { authorization } = req.headers
    if( authorization && authorization.startsWith('Bearer')){
        try {
            token = authorization.split(' ')[1]
            // console.log("token - ",token)
            // console.log("Authorization -", authorization)
            
            // verify Token
            const {userID} = jwt.verify(token , process.env.JWT_SECRET_KEY)


            // Get User from Token
            req.user = await User.findById(userID).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    res.status(401).send({ "status": "failed", "message": "Unauthorized User, Don't have Token" })
  }

  // Forget Password 
  
}

export default checkUserAuth