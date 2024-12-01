import { useState, useEffect } from "react";
import axios from "axios";

/**
 * A custom hook for fetching and managing category data.
 * @returns {Array} An array of categories.
 */
export default function useCategory() {
  const [categories, setCategories] = useState([]);

  /**
   * Fetches the list of categories from the server.
   * @async
   * @function
   */
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      setCategories(data?.category);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
