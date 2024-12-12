import { createContext, useState } from "react";

export const RecipeContext = createContext();
const RecipeProvide = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showMore, setShowMore] = useState(12);

  const recipe = {
    searchQuery,
    setSearchQuery,
    recipes,
    setRecipes,
    loading,
    setLoading,
    error,
    setError,
    showMore,
    setShowMore,
  };
  return (
    <RecipeContext.Provider value={recipe}>{children}</RecipeContext.Provider>
  );
};

export default RecipeProvide;
