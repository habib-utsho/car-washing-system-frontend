import Services from "../../pages/dashboard/admin/Services";
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
      { name: "All booking", path: "booking", element: "All booking" },
      { name: "All users", path: "users", element: <User /> },
    ],
  },
];
