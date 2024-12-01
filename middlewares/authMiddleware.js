import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

/**
 * Middleware to require user authentication using a JSON Web Token (JWT).
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
export const requireSignIn = async (req, res, next) => {
  try {
    // Verify the JWT token in the request's authorization header.
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    
    // Attach the decoded user information to the request object.
    req.user = decode;
    
    // Continue to the next middleware or route.
    next();
  } catch (error) {
    console.log(error);
    // Handle authentication error if the token is invalid or expired.
  }
};

/**
 * Middleware to check if a user has admin access.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
export const isAdmin = async (req, res, next) => {
  try {
    // Find the user by their ID.
    const user = await userModel.findById(req.user._id);

    // Check if the user has admin role (role: 1).
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      // Continue to the next middleware or route if the user is an admin.
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
