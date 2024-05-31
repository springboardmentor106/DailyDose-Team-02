import jwt from "jsonwebtoken";

const checkUserAuth = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ status: "failed", message: "Unauthorized User, Token is missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: "failed", message: err.message });
        // console.log(err);
      }
      else {
        req.userId = decoded.userID;
        req.role = decoded.role;
        next();
      }
    });

  } catch (error) {
    console.error("Error in token verification:", error);
    return res.status(401).json({ status: "failed", message: "Failed to authenticate token." });
  }
};

export default checkUserAuth;