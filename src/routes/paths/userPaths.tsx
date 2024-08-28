import ChangePassword from "../../pages/dashboard/ChangePassword";
import EditProfile from "../../pages/dashboard/EditProfile";
import Booking from "../../pages/dashboard/user/Booking";

export const userPaths = [
  { name: "Dashboard", path: "dashboard", element: "User home" },
  {
    name: "Services",
    path: "services",
    element: "Services",
  },
  {
    name: "Booking",
    children: [
      {
        name: "Booking",
        path: "dashboard/booking",
        element: <Booking />,
      },
      {
        name: "Upcoming booking",
        path: "dashboard/upcoming-booking",
        element: <ChangePassword />,
      },
    ],
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
