import Services from "../../pages/dashboard/admin/Services";
import Booking from "../../pages/dashboard/admin/UserManagement/Booking";
import User from "../../pages/dashboard/admin/UserManagement/User";

export const adminPaths = [
  { name: "Dashboard", path: "dashboard", element: "Admin home" },
  {
    name: "Services",
    path: "services",
    element: <Services />,
  },
  {
    name: "User management",
    children: [
      { name: "User bookings", path: "bookings", element: <Booking /> },
      { name: "Users", path: "users", element: <User /> },
    ],
  },
];
