import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

/**
 * Authentication provider component that manages user authentication state and token.
 * @param {Object} children - The child components that should be wrapped by the authentication provider.
 */
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Set the authorization token for axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * A custom hook that provides access to the authentication context.
 * @returns {Array} An array containing the authentication state and a function to set the authentication state.
 */
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
