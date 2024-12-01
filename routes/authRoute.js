import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// Create a router instance
const router = express.Router();

/**
 * Route for user registration.
 * @name POST /register
 * @function
 * @memberof router
 * @param {Function} registerController - Controller for user registration.
 */
router.post("/register", registerController);

/**
 * Route for user login.
 * @name POST /login
 * @function
 * @memberof router
 * @param {Function} loginController - Controller for user login.
 */
router.post("/login", loginController);

/**
 * Route for initiating a password reset.
 * @name POST /forgot-password
 * @function
 * @memberof router
 * @param {Function} forgotPasswordController - Controller for initiating password reset.
 */
router.post("/forgot-password", forgotPasswordController);

/**
 * Test route for authorized admin users.
 * @name GET /test
 * @function
 * @memberof router
 * @param {Function} requireSignIn - Middleware to check if the user is signed in.
 * @param {Function} isAdmin - Middleware to check if the user is an admin.
 * @param {Function} testController - Controller for testing purposes.
 */
router.get("/test", requireSignIn, isAdmin, testController);

/**
 * Protected route for user authentication.
 * @name GET /user-auth
 * @function
 * @memberof router
 * @param {Function} requireSignIn - Middleware to check if the user is signed in.
 */
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

/**
 * Protected route for admin authentication.
 * @name GET /admin-auth
 * @function
 * @memberof router
 * @param {Function} requireSignIn - Middleware to check if the user is signed in.
 * @param {Function} isAdmin - Middleware to check if the user is an admin.
 */
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

/**
 * Route for updating the user's profile.
 * @name PUT /profile
 * @function
 * @memberof router
 * @param {Function} requireSignIn - Middleware to check if the user is signed in.
 * @param {Function} updateProfileController - Controller for updating the user's profile.
 */
router.put("/profile", requireSignIn, updateProfileController);

/**
 * Route for retrieving the user's orders.
 * @name GET /orders
 * @function
 * @memberof router
 * @param {Function} requireSignIn - Middleware to check if the user is signed in.
 * @param {Function} getOrdersController - Controller for getting the user's orders.
 */
router.get("/orders", requireSignIn, getOrdersController);

/**
 * Route for retrieving all orders (admin only).
 * @name GET /all-orders
 * @function
 * @memberof router
 * @param {Function} requireSignIn - Middleware to check if the user is signed in.
 * @param {Function} isAdmin - Middleware to check if the user is an admin.
 * @param {Function} getAllOrdersController - Controller for getting all orders.
 */
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

/**
 * Route for updating the status of an order (admin only).
 * @name PUT /order-status/:orderId
 * @function
 * @memberof router
 * @param {Function} requireSignIn - Middleware to check if the user is signed in.
 * @param {Function} isAdmin - Middleware to check if the user is an admin.
 * @param {Function} orderStatusController - Controller for updating order status.
 */
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

export default router;
