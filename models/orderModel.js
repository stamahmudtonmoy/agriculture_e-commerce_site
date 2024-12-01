import mongoose from "mongoose";

/**
 * Represents an order in the application.
 * @typedef {Object} Order
 * @property {mongoose.ObjectId[]} products - An array of product references in the order.
 * @property {Object} payment - Payment information for the order.
 * @property {mongoose.ObjectId} buyer - Reference to the user who placed the order.
 * @property {string} status - The status of the order, which can be one of: "Not Process", "Processing", "Shipped", "Delivered", "Canceled".
 * @property {Date} createdAt - The timestamp when the order was created.
 * @property {Date} updatedAt - The timestamp when the order was last updated.
 */

/**
 * Mongoose schema for the "Order" collection.
 * @type {mongoose.Schema}
 */
const orderSchema = new mongoose.Schema(
  {
    /**
     * An array of product references in the order.
     * @type {mongoose.ObjectId[]}
     * @ref "Product"
     */
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],

    /**
     * Payment information for the order.
     * @type {Object}
     */
    payment: {},

    /**
     * Reference to the user who placed the order.
     * @type {mongoose.ObjectId}
     * @ref "User"
     */
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },

    /**
     * The status of the order.
     * @type {string}
     * @default "Not Process"
     * @enum ["Not Process", "Processing", "Shipped", "Delivered", "Canceled"]
     */
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Canceled"],
    },
  },
  { timestamps: true }
);

/**
 * Model for the "Order" collection in the MongoDB database.
 * @type {mongoose.Model<Order>}
 */
export default mongoose.model("Order", orderSchema);
