/**
 * Products Component
 * 
 * This component is responsible for displaying a list of all products available in the system.
 * It fetches the list of products from the backend and renders each product as a card with 
 * details like name, description, and image. Each product is clickable, redirecting to a 
 * detailed page for editing or managing the specific product.
 * 
 * @component
 * @example
 * return (
 *   <Products />
 * );
 * 
 * @returns {JSX.Element} - Renders a list of products displayed as cards, each with a link to view the product details.
 */
import React, { useState, useEffect } from "react"; // React library and hooks for state and effect management
import AdminMenu from "../../components/Layout/AdminMenu"; // Admin navigation menu component
import Layout from "./../../components/Layout/Layout"; // Layout component for wrapping the page structure
import axios from "axios"; // Axios library for making HTTP requests
import toast from "react-hot-toast"; // Toast notifications for success and error messages
import { Link } from "react-router-dom"; // React Router's Link component for navigation

/**
 * The `Products` component fetches all available products from the backend
 * and displays them as clickable cards. Each card contains product details
 * like the name, description, and photo.
 */
const Products = () => {
  // State hook for storing the list of products
  const [products, setProducts] = useState([]);

  /**
   * Fetches the list of all products from the backend and stores them in the `products` state.
   * If an error occurs, it logs the error and displays an error message via a toast notification.
   */
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product"); // Make GET request to fetch products
      setProducts(data.products); // Set the fetched products into state
    } catch (error) {
      console.log(error); // Log error if API request fails
      toast.error("Something Went Wrong"); // Show error toast if the API request fails
    }
  };

  // Fetch products once the component is mounted
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    // Render the layout for the page
    <Layout>
      <div className="row">
        <div className="col-md-3">
          {/* Admin menu for navigation */}
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
            {/* Map over the products and render each as a card */}
            {products?.map((p) => (
              <Link
                key={p._id} // Unique key for each link element
                to={`/dashboard/admin/product/${p.slug}`} // Navigate to the product detail page using the product's slug
                className="product-link" // Custom class for styling the product link
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`} // Display product image
                    className="card-img-top"
                    alt={p.name} // Set alt text for the image
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5> {/* Product name */}
                    <p className="card-text">{p.description}</p> {/* Product description */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
