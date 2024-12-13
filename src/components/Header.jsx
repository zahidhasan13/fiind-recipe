import { useContext, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/RecipeProvide";

const Header = () => {
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    setRecipes,
    setError,
    setLoading,
    setShowMore,
    savedData,
  } = useContext(RecipeContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    getData(searchQuery);
    setSearchQuery("");
    searchInput.current.blur();
    navigate("/");
    setRecipes([]);
    setShowMore(12);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`
      );
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      if (data.results === 0) throw new Error("Recipe not found");
      setRecipes(data?.data?.recipes);
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
              className="lg:w-96 py-3 px-6 rounded-full shadow-sm outline-none focus:shadow-rose-500 duration-300"
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
                Favourite{" "}
                <span className="text-rose-700">({savedData.length})</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
