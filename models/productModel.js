import mongoose from "mongoose";

/**
 * Represents a product in the application.
 * @typedef {Object} Product
 * @property {string} name - The name of the product.
 * @property {string} slug - A unique slug associated with the product.
 * @property {string} description - The description of the product.
 * @property {number} price - The price of the product.
 * @property {mongoose.ObjectId} category - Reference to the category of the product.
 * @property {number} quantity - The available quantity of the product.
 * @property {Object} photo - Information about the product's photo, including data and content type.
 * @property {boolean} shipping - Indicates whether the product is available for shipping.
 * @property {Date} createdAt - The timestamp when the product was created.
 * @property {Date} updatedAt - The timestamp when the product was last updated.
 */

/**
 * Mongoose schema for the "Product" collection.
 * @type {mongoose.Schema}
 */
const productSchema = new mongoose.Schema(
  {
    /**
     * The name of the product.
     * @type {string}
     * @required
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * A unique slug associated with the product.
     * @type {string}
     * @required
     */
    slug: {
      type: String,
      required: true,
    },

    /**
     * The description of the product.
     * @type {string}
     * @required
     */
    description: {
      type: String,
      required: true,
    },

    /**
     * The price of the product.
     * @type {number}
     * @required
     */
    price: {
      type: Number,
      required: true,
    },

    /**
     * Reference to the category of the product.
     * @type {mongoose.ObjectId}
     * @ref "Category"
     * @required
     */
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },

    /**
     * The available quantity of the product.
     * @type {number}
     * @required
     */
    quantity: {
      type: Number,
      required: true,
    },

    /**
     * Information about the product's photo, including data and content type.
     * @type {Object}
     */
    photo: {
      data: Buffer,
      contentType: String,
    },

    /**
     * Indicates whether the product is available for shipping.
     * @type {boolean}
     */
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

/**
 * Model for the "Product" collection in the MongoDB database.
 * @type {mongoose.Model<Product>}
 */
export default mongoose.model("Product", productSchema);
