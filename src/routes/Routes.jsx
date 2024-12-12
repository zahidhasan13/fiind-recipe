import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Favourite from "../pages/Favourite";
import RecipeItem from "../pages/RecipeItem";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/favourite",
        element: <Favourite />,
      },
      {
        path: "/recipe-item/:id",
        element: <RecipeItem />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
export default router;
