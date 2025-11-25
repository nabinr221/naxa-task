import { createBrowserRouter } from "react-router";
import ClientLayout from "../components/layouts/ClientLayout/ClientLayout";
import HomePage from "../pages/HomePage";

const routes = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "users", element: <h1>users</h1> },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
