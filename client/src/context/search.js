import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

/**
 * Search provider component that manages the search state.
 * @param {Object} children - The child components that should be wrapped by the search provider.
 */
const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
}

/**
 * A custom hook that provides access to the search context.
 * @returns {Array} An array containing the search state and a function to set the search state.
 */
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
