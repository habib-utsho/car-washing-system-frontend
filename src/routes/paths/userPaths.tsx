import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ChangePassword from "../../pages/dashboard/ChangePassword";
import EditProfile from "../../pages/dashboard/EditProfile";
import Booking from "../../pages/dashboard/user/Booking";
import DashboardHome from "../../pages/dashboard/user/DashboardHome";
import UpcomingBooking from "../../pages/dashboard/user/UpcomingBooking";

export const userPaths = [
  {
    name: "Dashboard",
    icon: <AppstoreAddOutlined />,
    path: "dashboard",
    element: <DashboardHome />,
  },
  {
    name: "Booking",
    icon: <CalendarOutlined />,
    children: [
      {
        name: "Booking",
        path: "dashboard/booking",
        icon: <AppstoreOutlined />,
        element: <Booking />,
      },
      {
        name: "Upcoming booking",
        path: "dashboard/upcoming-booking",
        icon: <CalendarOutlined />,
        element: <UpcomingBooking />,
      },
    ],
  },
  {
    name: "Profile",
    icon: <UserOutlined />,
    children: [
      {
        name: "Profile",
        path: "dashboard/profile",
        icon: <UserOutlined />,
        element: <EditProfile />,
      },
      {
        name: "Change password",
        path: "dashboard/change-password",
        icon: <LockOutlined />,
        element: <ChangePassword />,
      },
    ],
  },
];
