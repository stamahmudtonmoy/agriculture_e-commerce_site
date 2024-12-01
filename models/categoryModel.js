import mongoose from "mongoose";

/**
 * Represents a category in the application.
 * @typedef {Object} Category
 * @property {string} name - The name of the category. Required and must be unique.
 * @property {string} slug - The lowercase slug derived from the category name.
 */

/**
 * Mongoose schema for the "Category" collection.
 * @type {mongoose.Schema}
 */
const categorySchema = new mongoose.Schema({
  /**
   * The name of the category.
   * @type {string}
   * @required
   * @unique
   */
  name: {
    type: String,
    required: true,
    unique: true,
  },
  
  /**
   * The lowercase slug derived from the category name.
   * @type {string}
   * @lowercase
   */
  slug: {
    type: String,
    lowercase: true,
  },
});

/**
 * Model for the "Category" collection in the MongoDB database.
 * @type {mongoose.Model<Category>}
 */
export default mongoose.model("Category", categorySchema);
