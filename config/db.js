import mongoose from "mongoose";
import colors from "colors";

/**
 * Connects to the MongoDB database using the provided connection URL.
 * @function
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the connection URL from the environment variables.
    const conn = await mongoose.connect(process.env.MONGO_URL);

    // Log a success message if the connection is established.
    console.log(
      `Connected to MongoDB Database at ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    // Log an error message if there is an issue with the database connection.
    console.log(`Error in MongoDB: ${error}`.bgRed.white);
  }
};

export default connectDB;
