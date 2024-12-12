import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RecipeContext } from "../context/RecipeProvide";
import { IoMdCheckmark } from "react-icons/io";
import { GiKnifeFork } from "react-icons/gi";

const RecipeItem = () => {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const { loading, setLoading, error, setError } = useContext(RecipeContext);
  console.log(recipe);

  useEffect(() => {
    const getRecipeItem = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        if (!data.results === 0) throw new Error("Recipe not found");
        setRecipe(data.data.recipe);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    getRecipeItem();
  }, []);

  // Duration calcutation
  const durationCalc = (duration) => {
    if (!duration) return;

    if (!String(duration).includes(".")) {
      return String(duration) + "h";
    }
    if (String(duration).includes(".")) {
      return String(duration).replace(".", "h") + "min";
    }
  };

  return (
    <div className="container mx-auto py-10 min-h-screen">
      {!loading && !error && !recipe ? (
        <p className="text-center text-3xl text-rose-400 font-bold">
          Nothing to show, please search something!
        </p>
      ) : null}

      {loading && (
        <div className="text-center text-2xl text-rose-500">
          {error ? (
            error
          ) : (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-rose-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      )}
      {recipe?.title && (
        <div className="flex flex-col lg:flex-row items-start gap-10">
          <div className="w-1/2">
            <div className="h-96 rounded-2xl overflow-hidden">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-full object-cover hover:scale-110 duration-300"
              />
            </div>
            <div className="mt-20">
              <p className="text-4xl font-bold text-gray-600 flex items-center gap-3 mb-7">
                <span className="text-rose-500">
                  <GiKnifeFork />
                </span>
                Ingredients:
              </p>
              {recipe.ingredients.map((ing, i) => (
                <li
                  key={i}
                  className="list-none mt-2 flex items-center gap-3 text-lg"
                >
                  <span>
                    <IoMdCheckmark />
                  </span>{" "}
                  <span>
                    {ing.quantity} {ing.unit} {ing.description}
                  </span>
                </li>
              ))}
            </div>
          </div>
          <div className="w-1/2">
            <p className="font-bold text-sky-600">{recipe.publisher}</p>
            <h2 className="text-3xl font-semibold text-gray-600 mt-2">
              {recipe.title}
            </h2>
            <div className="flex items-center gap-5 mt-3 text-rose-600">
              <span className="font-bold uppercase">
                servings: {recipe.servings} people
              </span>
              <span className="font-bold uppercase">
                cooking time:{" "}
                {recipe.cooking_time < 60
                  ? String(recipe.cooking_time) + "min"
                  : durationCalc(recipe.cooking_time / 60)}
              </span>
            </div>
            <div className="flex items-center gap-5 mt-10">
              <button className="px-4 py-2 bg-gradient-to-t from-sky-400 to-sky-600 hover:to-sky-400 hover:from-sky-600 rounded-md text-white font-semibold uppercase">
                + set as favorite
              </button>
              <Link to={recipe.source_url} target="_blank">
                <button className="px-4 py-2 bg-gradient-to-t from-purple-400 to-purple-600 hover:to-purple-400 hover:from-purple-600 duration-300 rounded-md text-white font-semibold uppercase">
                  get direction
                </button>
              </Link>
              <Link to="/">
                <button className="px-4 py-2 bg-gradient-to-t from-rose-400 to-rose-600 hover:to-rose-400 hover:from-rose-600 duration-300 rounded-md text-white font-semibold uppercase">
                  go homepage
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeItem;
