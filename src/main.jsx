import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import RecipeProvide from "./context/RecipeProvide";
import "./index.css";
import router from "./routes/Routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecipeProvide>
      <RouterProvider router={router} />
    </RecipeProvide>
  </StrictMode>
);
