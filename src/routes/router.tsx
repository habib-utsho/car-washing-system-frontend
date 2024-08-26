import { createBrowserRouter } from "react-router-dom";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Homepage from "../pages/Homepage";
import MainLayout from "../components/layout/MainLayout";
import Services from "../pages/Services";
import AdminRoute from "./PrivateRoutes/AdminRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./paths/adminPaths";
import { userPaths } from "./paths/userPaths";
import UserRoute from "./PrivateRoutes/UserRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/services",
        element: <Services />,
      },
    ],
  },

  {
    path: "/user",
    element: (
      <UserRoute>
        <DashboardLayout />
      </UserRoute>
    ),
    children: routesGenerator(userPaths),
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: routesGenerator(adminPaths),
  },
]);

export default router;
