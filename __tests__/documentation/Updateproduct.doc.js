/**
 * UpdateProduct Component
 * 
 * This component allows an admin to update the details of an existing product, 
 * including product name, description, price, quantity, category, and shipping options.
 * It also provides functionality for uploading a product photo and deleting the product.
 * 
 * @component
 * @example
 * return (
 *   <UpdateProduct />
 * );
 * 
 * @returns {JSX.Element} - Renders the update product page with the form for editing and managing product data.
 */

import React, { useState, useEffect } from "react"; // React library and hooks for state and effect management
import Layout from "./../../components/Layout/Layout"; // Layout component for wrapping the page structure
import AdminMenu from "./../../components/Layout/AdminMenu"; // AdminMenu component for navigation options
import toast from "react-hot-toast"; // Toast notifications for success and error messages
import axios from "axios"; // Axios library for making HTTP requests
import { Select } from "antd"; // Ant Design's Select component for category and shipping options
import { useNavigate, useParams } from "react-router-dom"; // React Router hooks for navigation and URL params

const { Option } = Select; // Destructuring Option from Select component for category and shipping options

/**
 * The `UpdateProduct` component enables an admin to update product details
 * and upload a new product image or remove an existing one.
 * 
 * It also allows the deletion of a product from the database.
 */
const UpdateProduct = () => {
  // React Router hooks
  const navigate = useNavigate(); // Hook to navigate programmatically
  const params = useParams(); // Hook to access URL parameters, such as the product ID

  // State hooks for product details
  const [categories, setCategories] = useState([]); // State to store list of categories
  const [name, setName] = useState(""); // State for product name
  const [description, setDescription] = useState(""); // State for product description
  const [price, setPrice] = useState(""); // State for product price
  const [category, setCategory] = useState(""); // State for selected category
  const [quantity, setQuantity] = useState(""); // State for product quantity
  const [shipping, setShipping] = useState(""); // State for shipping availability
  const [photo, setPhoto] = useState(""); // State for selected product photo
  const [id, setId] = useState(""); // State for product ID

  /**
   * Fetches the details of a single product from the backend using its slug (parameter in URL).
   * Sets the product details into state variables.
   */
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      // Destructure product data and set the state accordingly
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error); // Log error if API request fails
    }
  };

  // Fetch product details once the component is mounted
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  /**
   * Fetches all categories from the backend to populate the category dropdown.
   * Displays an error message if the API request fails.
   */
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category); // Set the fetched categories into state
      }
    } catch (error) {
      console.log(error); // Log error if API request fails
      toast.error("Something went wrong in getting category"); // Show error toast
    }
  };

  // Fetch categories when the component is mounted
  useEffect(() => {
    getAllCategory();
  }, []);

  /**
   * Handles product update form submission.
   * Sends the updated product data to the backend using a PUT request.
   * If successful, redirects to the product listing page and shows success message.
   *
   * @param {Object} e - The form submit event
   * @returns {void}
   */
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const productData = new FormData(); // Create a new FormData object to handle file data
      productData.append("name", name); // Append product name to form data
      productData.append("description", description); // Append description to form data
      productData.append("price", price); // Append price to form data
      productData.append("quantity", quantity); // Append quantity to form data
      photo && productData.append("photo", photo); // Append photo if present
      productData.append("category", category); // Append selected category to form data

      // Make PUT request to update the product
      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.error(data?.message); // Show error toast if update failed
      } else {
        toast.success("Product Updated Successfully"); // Show success toast if update succeeded
        navigate("/dashboard/admin/products"); // Redirect to the product list page
      }
    } catch (error) {
      console.log(error); // Log error if API request fails
      toast.error("Something went wrong"); // Show error toast
    }
  };

  /**
   * Handles the deletion of the product.
   * Prompts the user for confirmation, then sends a DELETE request to remove the product.
   * After successful deletion, redirects to the product list page and shows success message.
   */
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure you want to delete this product?"); // Confirmation prompt
      if (!answer) return; // If user cancels, return early
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}` // Send DELETE request to delete the product
      );
      toast.success("Product Deleted Successfully"); // Show success toast
      navigate("/dashboard/admin/products"); // Redirect to the product list page
    } catch (error) {
      console.log(error); // Log error if API request fails
      toast.error("Something went wrong"); // Show error toast
    }
  };

  return (
    // Render the layout with the title "Dashboard - Update Product"
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            {/* Admin navigation menu */}
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              {/* Category selection dropdown */}
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value); // Update category state on selection change
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name} {/* Render category options */}
                  </Option>
                ))}
              </Select>

              {/* File input for uploading a product photo */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])} // Set selected photo
                    hidden
                  />
                </label>
              </div>

              {/* Display selected or existing product photo */}
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)} // Display selected photo in preview
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-photo/${id}`} // Display existing photo from backend
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              {/* Product name input */}
              <div className="mb-3">
                <input
                  type="text"
                  value={name} // Set value to the name state
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)} // Update name state on input change
                />
              </div>

              {/* Product description input */}
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description} // Set value to the description state
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)} // Update description state on input change
                />
              </div>

              {/* Product price input */}
              <div className="mb-3">
                <input
                  type="number"
                  value={price} // Set value to the price state
                  placeholder="Write a price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)} // Update price state on input change
                />
              </div>

              {/* Product quantity input */}
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity} // Set value to the quantity state
                  placeholder="Write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)} // Update quantity state on input change
                />
              </div>

              {/* Shipping selection dropdown */}
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value); // Update shipping state on selection change
                  }}
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>

              {/* Update product button */}
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>

              {/* Delete product button */}
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
