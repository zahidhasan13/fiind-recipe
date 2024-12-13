import { Link } from "react-router-dom";

const Recipes = ({ recipe }) => {
  return (
    <div className="card w-72 bg-white/70 rounded-md overflow-hidden hover:shadow-md">
      <img
        src={recipe.image_url}
        alt={recipe.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 p">
        <span className="text-sky-400 font-semibold bg-sky-100 px-3 py-1 rounded-full">
          {recipe.publisher}
        </span>
        <h2 className="text-2xl font-semibold text-gray-600 truncate my-5">
          {recipe.title}
        </h2>
        <Link to={`/recipe-item/${recipe.id}`}>
          <button className="bg-gradient-to-t from-rose-500 to-rose-600 px-3 py-1 text-white font-semibold rounded-md hover:from-rose-600 hover:to-rose-500 duration-300">
            View Recipe
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Recipes;
