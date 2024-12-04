// Importing necessary libraries and components
import React, { useState, useEffect } from "react"; // React and necessary hooks for managing state and effects
import UserMenu from "../../components/Layout/UserMenu"; // UserMenu component for the sidebar menu
import Layout from "./../../components/Layout/Layout"; // Layout component for wrapping the profile page structure
import { useAuth } from "../../context/auth"; // useAuth hook to access user authentication data
import toast from "react-hot-toast"; // Toast notifications for success and error messages
import axios from "axios"; // Axios for making HTTP requests

/**
 * Profile component for displaying and updating user profile information.
 * 
 * This component allows the user to view and update their personal details, 
 * such as name, email, password, phone, and address.
 * 
 * @component
 * @example
 * return (
 *   <Profile />
 * );
 * 
 * @returns {JSX.Element} - Renders the user profile form.
 */
const Profile = () => {
  // Context to get and set user authentication data
  // Retrieves current authentication status and user data
  const [auth, setAuth] = useAuth(); // Destructuring auth state and function

  // State hooks for user profile data
  // States to store and update user profile information
  const [name, setName] = useState(""); // Name state
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [phone, setPhone] = useState(""); // Phone state
  const [address, setAddress] = useState(""); // Address state

  /**
   * Fetches the user profile data from the authentication context and sets the 
   * local state for the profile fields.
   * This effect runs once when the component is mounted and when the `auth` context changes.
   */
  useEffect(() => {
    // Destructuring user data from the authentication context
    const { email, name, phone, address } = auth?.user;
    // Setting state with the user data retrieved from the context
    setName(name); // Setting name
    setPhone(phone); // Setting phone
    setEmail(email); // Setting email
    setAddress(address); // Setting address
  }, [auth?.user]); // Effect dependency to trigger whenever auth.user changes

  /**
   * Handles the form submission to update the user's profile.
   * Sends a PUT request to the API to update the user data, then updates the context 
   * and local storage with the new user information.
   *
   * @param {Object} e - The form submit event.
   * @returns {void}
   */
  const handleSubmit = async (e) => {
    // Prevents default form submission behavior
    e.preventDefault();
    try {
      // Sending PUT request to update user profile with the form data
      const { data } = await axios.put("/api/v1/auth/profile", {
        name, // Passing name data
        email, // Passing email data
        password, // Passing password data
        phone, // Passing phone data
        address, // Passing address data
      });

      // Check for any error in response data
      if (data?.error) {
        // Display error message if update fails
        toast.error(data?.error); // Toast error notification
      } else {
        // Update the auth context with the updated user data
        setAuth({ ...auth, user: data?.updatedUser }); // Updating auth context

        // Retrieve the current auth data from localStorage
        let ls = localStorage.getItem("auth"); // Fetch data from local storage
        // Parse the stored auth data
        ls = JSON.parse(ls); // Parsing the stored auth data
        // Update the user data in localStorage
        ls.user = data.updatedUser; // Updating user data
        localStorage.setItem("auth", JSON.stringify(ls)); // Saving updated data to local storage

        // Show success message upon successful profile update
        toast.success("Profile Updated Successfully"); // Toast success notification
      }
    } catch (error) {
      // Log error to console and show error toast
      console.log(error); // Log error for debugging
      toast.error("Something went wrong"); // Toast error notification
    }
  };

  return (
    // Layout component to wrap the profile page
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            {/* UserMenu component to display the navigation menu */}
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              {/* Profile update form */}
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                
                {/* Name input field */}
                <div className="mb-3">
                  <input
                    type="text"
                    value={name} // Set value of input field to the state
                    onChange={(e) => setName(e.target.value)} // Update name state on change
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                    autoFocus // Auto focus when input is rendered
                  />
                </div>
                
                {/* Email input field */}
                <div className="mb-3">
                  <input
                    type="email"
                    value={email} // Set value of input field to the state
                    onChange={(e) => setEmail(e.target.value)} // Update email state on change
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                    disabled // Email is disabled to prevent modification
                  />
                </div>
                
                {/* Password input field */}
                <div className="mb-3">
                  <input
                    type="password"
                    value={password} // Set value of input field to the state
                    onChange={(e) => setPassword(e.target.value)} // Update password state on change
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Your Password"
                  />
                </div>
                
                {/* Phone input field */}
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone} // Set value of input field to the state
                    onChange={(e) => setPhone(e.target.value)} // Update phone state on change
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Phone"
                  />
                </div>
                
                {/* Address input field */}
                <div className="mb-3">
                  <input
                    type="text"
                    value={address} // Set value of input field to the state
                    onChange={(e) => setAddress(e.target.value)} // Update address state on change
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Address"
                  />
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Exporting Profile component
export default Profile;
