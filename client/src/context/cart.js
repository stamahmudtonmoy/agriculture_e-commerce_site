import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

/**
 * Cart provider component that manages the cart state.
 * @param {Object} children - The child components that should be wrapped by the cart provider.
 */
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * A custom hook that provides access to the cart context.
 * @returns {Array} An array containing the cart state and a function to set the cart state.
 */
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
