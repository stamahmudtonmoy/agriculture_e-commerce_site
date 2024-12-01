import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

/**
 * Route for creating a new category.
 * @name POST /create-category
 * @function
 * @memberof router
 * @param {Function} requireSignIn - Middleware to check if the user is signed in.
 * @param {Function} isAdmin - Middleware to check if the user is an admin.
 * @param {Function} createCategoryController - Controller for creating a new category.
 */
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

/**
 * Route for updating a category by its ID.
 * @name PUT /update-category/:id
 * @function
 * @memberof router
 * @param {Function} requireSignIn - Middleware to check if the user is signed in.
 * @param {Function} isAdmin - Middleware to check if the user is an admin.
 * @param {Function} updateCategoryController - Controller for updating a category.
 */
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

/**
 * Route for getting a list of all categories.
 * @name GET /get-category
 * @function
 * @memberof router
 * @param {Function} categoryControlller - Controller for retrieving a list of all categories.
 */
router.get("/get-category", categoryControlller);

/**
 * Route for getting a single category by its slug.
 * @name GET /single-category/:slug
 * @function
 * @memberof router
 * @param {Function} singleCategoryController - Controller for retrieving a single category.
 */
router.get("/single-category/:slug", singleCategoryController);

/**
 * Route for deleting a category by its ID.
 * @name DELETE /delete-category/:id
 * @function
 * @memberof router
 * @param {Function} requireSignIn - Middleware to check if the user is signed in.
 * @param {Function} isAdmin - Middleware to check if the user is an admin.
 * @param {Function} deleteCategoryCOntroller - Controller for deleting a category.
 */
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;
