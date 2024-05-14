import jwt from "jsonwebtoken";

var checkUserAuth = async (req, res, next) => {
  const token = req.headers['authorization']
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        console.log(decoded);
        if (err) {
          return res.status(401).json({ message: 'Failed to authenticate token.' + err });
        }
        req.body.userId = decoded.userID;
        req.body.role = decoded.role;
        next();
      });

      next()
    } catch (error) {
      console.log(error)
      return res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
    }
  }
  if (!token) {
    return res.status(401).send({ "status": "failed", "message": "Unauthorized User, Don't have Token" })
  }

}

export default checkUserAuth