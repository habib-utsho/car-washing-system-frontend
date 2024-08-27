import DashboardHome from "../../pages/dashboard/admin/DashboardHome";
import Services from "../../pages/dashboard/admin/Services";
import Slots from "../../pages/dashboard/admin/Slots";
import Booking from "../../pages/dashboard/admin/UserManagement/Booking";
import User from "../../pages/dashboard/admin/UserManagement/User";

export const adminPaths = [
  { name: "Dashboard", path: "dashboard", element: <DashboardHome /> },
  {
    name: "Services",
    path: "services",
    element: <Services />,
  },
  {
    name: "Slots",
    path: "slots",
    element: <Slots />,
  },
  {
    name: "User management",
    children: [
      { name: "Users", path: "users", element: <User /> },
      { name: "User bookings", path: "bookings", element: <Booking /> },
    ],
  },
];
