import { createBrowserRouter, Link } from "react-router-dom";
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
import Service from "../pages/Service";
import { Button, Result } from "antd";
import Booking from "../pages/Booking";
import Success from "../pages/Success";
import Cancelled from "../pages/Cacelled";
import Failed from "../pages/Failed";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: (
      <div className="min-h-[90vh] flex items-center justify-center">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <div className="flex items-center justify-center">
              <Button type="default">
                <Link to={"/"}>Back Home</Link>
              </Button>
            </div>
          }
        />
      </div>
    ),
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
      {
        path: "/services/:id",
        element: <Service />,
      },
      {
        path: "/booking/:id",
        element: <Booking />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/cancelled",
        element: <Cancelled />,
      },
      {
        path: "/failed",
        element: <Failed />,
      },
      {
        path: "/booking/:id",
        element: <Booking />,
      },
      {
        path: "/booking/:id",
        element: <Booking />,
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
