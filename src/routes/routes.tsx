import { createBrowserRouter } from "react-router";
import ClientLayout from "../components/layouts/ClientLayout/ClientLayout";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import MapPage from "../pages/MapPage";

const routes = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "users", element: <UserPage /> },
      { path: "maps", element: <MapPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
