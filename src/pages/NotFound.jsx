import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <h3 className="text-5xl font-semibold text-rose-500">4🥘4</h3>
      <p className="text-5xl font-semibold text-rose-500">Page not found!😢</p>
      <Link to="/">
        <button className="px-4 py-2 bg-gradient-to-t from-rose-400 to-rose-600 hover:to-rose-400 hover:from-rose-600 duration-300 rounded-md text-white font-semibold uppercase">
          go homepage
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
