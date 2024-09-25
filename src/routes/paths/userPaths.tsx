import ChangePassword from "../../pages/dashboard/ChangePassword";
import EditProfile from "../../pages/dashboard/EditProfile";
import Booking from "../../pages/dashboard/user/Booking";
import DashboardHome from "../../pages/dashboard/user/DashboardHome";
import UpcomingBooking from "../../pages/dashboard/user/UpcomingBooking";

export const userPaths = [
  { name: "Dashboard", path: "dashboard", element: <DashboardHome /> },
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
        element: <UpcomingBooking />,
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
