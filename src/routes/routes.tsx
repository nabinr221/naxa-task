import { createBrowserRouter } from "react-router";
import ClientLayout from "../components/layouts/ClientLayout/ClientLayout";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";

const routes = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "users", element: <UserPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
