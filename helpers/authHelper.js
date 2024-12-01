import bcrypt from "bcrypt";

/**
 * Hashes a password using bcrypt.
 * @function
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Compares a password with its hashed version using bcrypt.
 * @function
 * @param {string} password - The password to be compared.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the passwords match.
 */
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
