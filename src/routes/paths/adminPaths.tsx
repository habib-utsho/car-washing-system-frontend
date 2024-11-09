import {
  DashboardOutlined,
  AppstoreOutlined,
  CalendarOutlined,
  TeamOutlined,
  UserOutlined,
  LockOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import DashboardHome from "../../pages/dashboard/admin/DashboardHome/DashboardHome";
import Services from "../../pages/dashboard/admin/Services";
import Slots from "../../pages/dashboard/admin/Slots";
import Booking from "../../pages/dashboard/admin/UserManagement/Booking";
import User from "../../pages/dashboard/admin/UserManagement/User";
import ChangePassword from "../../pages/dashboard/ChangePassword";
import EditProfile from "../../pages/dashboard/EditProfile";
import Notice from "../../pages/dashboard/admin/Notice/Notice";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <DashboardHome />,
    icon: <DashboardOutlined />,
  },
  {
    name: "Services",
    path: "services",
    element: <Services />,
    icon: <AppstoreOutlined />,
  },
  {
    name: "Slots",
    path: "slots",
    element: <Slots />,
    icon: <CalendarOutlined />,
  },
  {
    name: "User management",
    icon: <TeamOutlined />,
    children: [
      {
        name: "Users",
        path: "users",
        element: <User />,
        icon: <UserOutlined />,
      },
      {
        name: "User bookings",
        path: "bookings",
        element: <Booking />,
        icon: <CalendarOutlined />,
      },
      {
        name: "Profile",
        path: "dashboard/profile",
        element: <EditProfile />,
        icon: <UserOutlined />,
      },
      {
        name: "Change password",
        path: "dashboard/change-password",
        element: <ChangePassword />,
        icon: <LockOutlined />,
      },
    ],
  },
  {
    name: "Notice",
    icon: <NotificationOutlined />,
    children: [
      {
        name: "Notice",
        path: "notice",
        element: <Notice />,
        icon: <NotificationOutlined />,
      },
    ],
  },
];
