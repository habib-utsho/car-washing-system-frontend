import ChangePassword from "../../pages/dashboard/ChangePassword";
import EditProfile from "../../pages/dashboard/EditProfile";

export const userPaths = [
  { name: "Dashboard", path: "dashboard", element: "User home" },
  {
    name: "Services",
    path: "services",
    element: "Services",
  },

  {
    name: "Booking",
    path: "dashboard/booking",
    element: "Booking",
  },
  {
    name: "User management",
    children: [
      {
        name: "Profile",
        path: "dashboard/profile",
        element: <EditProfile />,
      },
      {
        name: "Change password",
        path: "dashboard/change-password",
        element: <ChangePassword />,
      },
    ],
  },
];
