/**
 * Main Application Component
 * Entry point for the React application with routing configuration
 */

import { RouterProvider } from "react-router";
import "./App.css";
import router from "./routes/routes";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
