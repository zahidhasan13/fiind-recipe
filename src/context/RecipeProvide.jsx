import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const RecipeContext = createContext();
const RecipeProvide = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showMore, setShowMore] = useState(12);
  const [savedData, setSavedData] = useState(() => {
    const localData = localStorage.getItem("recipes");
    return localData ? JSON.parse(localData) : [];
  });
  const [saveItemStatus, setSaveItemStatus] = useState(null);

  const checkLocalData = (data) => {
    const localData = JSON.parse(localStorage.getItem("recipes"));
    const existedData = localData?.some((item) => item.id === data.id);

    if (!existedData) {
      setSavedData([...savedData, data]);
      toast("Recipe Add to Favourite");
    } else {
      const filterData = localData.filter((item) => item.id !== data.id);
      setSavedData(filterData);
      toast("Recipe Delete form Favourite");
    }
  };

  const favouriteHandler = (id) => {
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => checkLocalData(data?.data?.recipe));
    setSaveItemStatus((prevStatus) => !prevStatus);
  };
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(savedData));
  }, [savedData]);

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
    favouriteHandler,
    savedData,
    saveItemStatus,
    setSaveItemStatus,
  };
  return (
    <RecipeContext.Provider value={recipe}>{children}</RecipeContext.Provider>
  );
};

export default RecipeProvide;
