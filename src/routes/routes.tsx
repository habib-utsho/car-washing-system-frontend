import { createBrowserRouter } from "react-router-dom";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Homepage from "../pages/Homepage";
import MainLayout from "../components/layout/MainLayout";

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
    ],
  },

  // {
  //   path: "/admin",
  //   element: (
  //     <PrivateRoute>
  //       <DashboardLayout />
  //     </PrivateRoute>
  //   ),
  //   children: routesGenerator(adminPaths),
  // },
]);

export default router;
