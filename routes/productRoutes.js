import express from "express";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

/**
 * Route for creating a new product.
 * @name POST /create-product
 * @function
 * @memberof router
 * @param {Function} requireSignIn - Middleware to check if the user is signed in.
 * @param {Function} isAdmin - Middleware to check if the user is an admin.
 * @param {Function} formidable - Middleware to handle file uploads.
 * @param {Function} createProductController - Controller for creating a new product.
 */
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

/**
 * Route for updating a product by its ID.
 * @name PUT /update-product/:pid
 * @function
 * @memberof router
 * @param {Function} requireSignIn - Middleware to check if the user is signed in.
 * @param {Function} isAdmin - Middleware to check if the user is an admin.
 * @param {Function} formidable - Middleware to handle file uploads.
 * @param {Function} updateProductController - Controller for updating a product.
 */
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

/**
 * Route for getting a list of products.
 * @name GET /get-product
 * @function
 * @memberof router
 * @param {Function} getProductController - Controller for retrieving a list of products.
 */
router.get("/get-product", getProductController);

/**
 * Route for getting a single product by its slug.
 * @name GET /get-product/:slug
 * @function
 * @memberof router
 * @param {Function} getSingleProductController - Controller for retrieving a single product.
 */
router.get("/get-product/:slug", getSingleProductController);

/**
 * Route for getting a product's photo by its ID.
 * @name GET /product-photo/:pid
 * @function
 * @memberof router
 * @param {Function} productPhotoController - Controller for retrieving a product's photo.
 */
router.get("/product-photo/:pid", productPhotoController);

/**
 * Route for deleting a product by its ID.
 * @name DELETE /delete-product/:pid
 * @function
 * @memberof router
 * @param {Function} deleteProductController - Controller for deleting a product.
 */
router.delete("/delete-product/:pid", deleteProductController);

/**
 * Route for filtering products based on criteria.
 * @name POST /product-filters
 * @function
 * @memberof router
 * @param {Function} productFiltersController - Controller for filtering products.
 */
router.post("/product-filters", productFiltersController);

/**
 * Route for getting the count of products.
 * @name GET /product-count
 * @function
 * @memberof router
 * @param {Function} productCountController - Controller for getting the count of products.
 */
router.get("/product-count", productCountController);

/**
 * Route for getting a list of products per page.
 * @name GET /product-list/:page
 * @function
 * @memberof router
 * @param {Function} productListController - Controller for getting a list of products per page.
 */
router.get("/product-list/:page", productListController);

/**
 * Route for searching products by a keyword.
 * @name GET /search/:keyword
 * @function
 * @memberof router
 * @param {Function} searchProductController - Controller for searching products by keyword.
 */
router.get("/search/:keyword", searchProductController);

/**
 * Route for getting related products based on a product and category ID.
 * @name GET /related-product/:pid/:cid
 * @function
 * @memberof router
 * @param {Function} realtedProductController - Controller for retrieving related products.
 */
router.get("/related-product/:pid/:cid", realtedProductController);

/**
 * Route for getting products of a specific category by its slug.
 * @name GET /product-category/:slug
 * @function
 * @memberof router
 * @param {Function} productCategoryController - Controller for retrieving products by category.
 */
router.get("/product-category/:slug", productCategoryController);

/**
 * Route for getting a Braintree client token for payments.
 * @name GET /braintree/token
 * @function
 * @memberof router
 * @param {Function} braintreeTokenController - Controller for getting a Braintree token.
 */
router.get("/braintree/token", braintreeTokenController);

/**
 * Route for processing a Braintree payment.
 * @name POST /braintree/payment
 * @function
 * @memberof router
 * @param {Function} requireSignIn - Middleware to check if the user is signed in.
 * @param {Function} brainTreePaymentController - Controller for processing Braintree payments.
 */
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
