import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check whether the request contains a token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access denied. Token is required.",
    });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make the verified user information available to the route
    req.user = decoded;

    // Continue to the requested route
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;