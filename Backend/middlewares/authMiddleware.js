import jwt from "jsonwebtoken";

const checkUserAuth = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ status: "failed", message: "Unauthorized User, Token is missing" });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.error("Error in token verification:", error);
    return res.status(401).json({ status: "failed", message: "Failed to authenticate token." });
  }
};

export default checkUserAuth;