/**
 * Main Application Component
 * Entry point for the React application with routing configuration
 */

import { RouterProvider } from "react-router";
import "./App.css";
import router from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
