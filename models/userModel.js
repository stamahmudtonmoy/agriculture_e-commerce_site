import mongoose from "mongoose";

/**
 * Represents a user in the application.
 * @typedef {Object} User
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user. Unique.
 * @property {string} password - The user's password.
 * @property {string} phone - The phone number of the user.
 * @property {Object} address - The user's address information.
 * @property {string} answer - A security answer for account recovery.
 * @property {number} role - The role of the user, with 0 as the default value.
 * @property {Date} createdAt - The timestamp when the user's account was created.
 * @property {Date} updatedAt - The timestamp when the user's account was last updated.
 */

/**
 * Mongoose schema for the "User" collection.
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema(
  {
    /**
     * The name of the user.
     * @type {string}
     * @required
     * @trim
     */
    name: {
      type: String,
      required: true,
      trim: true,
    },

    /**
     * The email address of the user.
     * @type {string}
     * @required
     * @unique
     */
    email: {
      type: String,
      required: true,
      unique: true,
    },

    /**
     * The user's password.
     * @type {string}
     * @required
     */
    password: {
      type: String,
      required: true,
    },

    /**
     * The phone number of the user.
     * @type {string}
     * @required
     */
    phone: {
      type: String,
      required: true,
    },

    /**
     * The user's address information.
     * @type {Object}
     * @required
     */
    address: {
      type: {},
      required: true,
    },

    /**
     * A security answer for account recovery.
     * @type {string}
     * @required
     */
    answer: {
      type: String,
      required: true,
    },

    /**
     * The role of the user.
     * @type {number}
     * @default 0
     */
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

/**
 * Model for the "User" collection in the MongoDB database.
 * @type {mongoose.Model<User>}
 */
export default mongoose.model("User", userSchema);
