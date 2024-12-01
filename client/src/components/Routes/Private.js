import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

/**
 * PrivateRoute component for protecting routes with user authentication.
 *
 * This component checks if the user is authenticated. If authenticated, it renders the content, otherwise, it displays a loading spinner.
 *
 * @returns {JSX.Element} A React component that displays the content for authorized users or a loading spinner while checking authentication.
 */
export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    /**
     * Function to check user authentication.
     */
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    // Check authentication when the token changes
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
