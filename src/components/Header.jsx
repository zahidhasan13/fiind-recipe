import { useContext, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { RecipeContext } from "../context/RecipeProvide";

const Header = () => {
  const searchInput = useRef(null);
  const {
    searchQuery,
    setSearchQuery,
    setRecipes,
    setError,
    setLoading,
    setShowMore,
  } = useContext(RecipeContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    getData(searchQuery);
    setSearchQuery("");
    searchInput.current.blur();
    setRecipes([]);
    setShowMore(12);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}&key=94b61e31-bc1b-491a-a068-e990917561ee`
      );
      if (!res.ok) throw new Error("Recipe not found");
      const data = await res.json();
      setRecipes(data.data.recipes);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Active Link style
  const navLink = ({ isActive }) => {
    return isActive ? { color: "#f43f5e" } : null;
  };
  return (
    <header className="header py-3">
      <div className="container mx-auto">
        <nav className="nav flex flex-col lg:flex-row items-center justify-between">
          <div className="logo text-2xl font-bold italic text-gray-700">
            <Link to="/">
              Find <span className="text-rose-600">Recipe</span>
            </Link>
          </div>
          <form className="search-form" onSubmit={submitHandler}>
            <input
              type="text"
              ref={searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find Recipe..."
              className="lg:w-96 py-1 px-4 rounded-full shadow-md outline-none shadow-rose-400 focus:shadow-rose-500 duration-300"
            />
          </form>
          <ul className="links flex items-center gap-5">
            <li className="text-gray-500 font-semibold">
              <NavLink end to="/" style={navLink}>
                Home
              </NavLink>
            </li>
            <li className="text-gray-500 font-semibold">
              <NavLink to="/favourite" style={navLink}>
                Favourite <span className="text-rose-700">(15)</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;