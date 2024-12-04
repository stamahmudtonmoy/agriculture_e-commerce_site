/**
 * Cart Context
 * 
 * This module defines a context (`CartContext`) and a provider (`CartProvider`) to manage the cart state
 * across the app. It also provides a custom hook (`useCart`) to access and update the cart state in any 
 * component that is wrapped by the `CartProvider`.
 * 
 * - `CartProvider`: A React component that holds and manages the cart state.
 * - `useCart`: A custom hook that provides access to the cart state and function to modify it.
 * 
 * @module CartContext
 */

import { useState, useContext, createContext, useEffect } from "react"; // React hooks and Context API

// Create a new context for the cart
const CartContext = createContext();

/**
 * CartProvider Component
 * 
 * A provider component that manages the cart state and makes it accessible
 * to any child components. It also checks if there is an existing cart stored
 * in `localStorage` and loads it when the component is mounted.
 * 
 * @param {Object} children - The child components that should be wrapped by the cart provider.
 * 
 * @example
 * return (
 *   <CartProvider>
 *     <YourComponent />
 *   </CartProvider>
 * );
 * 
 * @returns {JSX.Element} The wrapped children with access to the cart context.
 */
const CartProvider = ({ children }) => {
  // State to store the cart items
  const [cart, setCart] = useState([]);

  /**
   * useEffect hook to load the existing cart from localStorage when the component mounts.
   */
  useEffect(() => {
    // Check if there is a cart stored in localStorage
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem)); // Set the cart state if found
  }, []);

  return (
    // Provide the cart state and setCart function to the rest of the app
    <CartContext.Provider value={[cart, setCart]}>
      {children} {/* Render child components */}
    </CartContext.Provider>
  );
}

/**
 * useCart Hook
 * 
 * A custom hook that provides access to the cart context.
 * It returns the cart state and a function to update the cart.
 * 
 * @returns {Array} An array with the current cart state and the setCart function.
 * 
 * @example
 * const [cart, setCart] = useCart();
 * 
 * @returns {Array} - The cart state and the function to update it.
 */
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
