import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { GiKnifeFork } from "react-icons/gi";
import { IoMdCheckmark } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/RecipeProvide";

const SingleRecipe = ({ recipe }) => {
  const { favouriteHandler, savedData, saveItemStatus, setSaveItemStatus } =
    useContext(RecipeContext);
  // Duration calcutation
  const durationCalc = (duration) => {
    if (!duration) return;

    if (!String(duration).includes(".")) {
      return String(duration) + "h";
    }
    if (String(duration).includes(".")) {
      const splittedDuration = String(duration).split(".");
      const hour = splittedDuration[0] + "h";
      const splittedMinute = "." + splittedDuration[1];
      const minutes = +splittedMinute * 60 + "min";
      return hour + minutes;
    }
  };

  useEffect(() => {
    if (!recipe) return;
    setSaveItemStatus(savedData.some((item) => item.id === recipe.id));
  }, [recipe]);
  return (
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
          <button
            onClick={() => favouriteHandler(recipe.id)}
            className={`px-4 py-2 rounded-md text-white font-semibold uppercase ${
              saveItemStatus
                ? "bg-gradient-to-t from-red-400 to-red-600 hover:to-red-400 hover:from-red-600"
                : "bg-gradient-to-t from-sky-400 to-sky-600 hover:to-sky-400 hover:from-sky-600"
            }`}
          >
            {saveItemStatus ? "- Remove as favorite" : "+ set as favorite"}
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
      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          duration: 2000,
          style: {
            background: "fff",
            color: "f43f5e",
          },
        }}
      />
    </div>
  );
};

export default SingleRecipe;
