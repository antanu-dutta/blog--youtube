import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.token;

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.error("error in auth middleware", error);
    res.status(500).json({ success: false, message: "Invalid Token" });
  }
};
