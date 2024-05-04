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



// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";


// // Existing authentication middleware
// var checkUserAuth = async(req, res, next) => {
//     let token;
//     const { authorization } = req.headers;
//     if (authorization && authorization.startsWith('Bearer')) {
//         try {
//             token = authorization.split(' ')[1];
//             const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
//             req.user = await User.findById(userID).select('-password');
//             next();
//         } catch (error) {
//             console.log(error);
//             res.status(401).send({ "status": "failed", "message": "Unauthorized User" });
//         }
//     } else {
//         res.status(401).send({ "status": "failed", "message": "Unauthorized User, Don't have Token" });
//     }
// };

// // New authorization middleware
// const validateUserOrCaretaker = (req, res, next) => {
//     const userRole = req.user.role;
//     const userId = req.user._id.toString();
//     const targetUserId = req.params.userId || req.body.userId; // Assuming the target user's ID is passed in the request

//     // Allow if the user is performing the action on themselves
//     if (userId === targetUserId || !targetUserId) {
//         return next();
//     }

//     // Allow caretakers to perform actions on behalf of others
//     if (userRole === 'caretaker') {
//         return next();
//     }

//     // If none of the above, deny access
//     return res.status(403).json({ message: "You're not authorized to perform this action" });
// };

// export default { checkUserAuth, validateUserOrCaretaker };