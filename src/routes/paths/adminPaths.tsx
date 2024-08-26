import Services from "../../pages/dashboard/admin/Services";

export const adminPaths = [
  { name: "Dashboard", path: "dashboard", element: "Admin home" },
  {
    name: "Services",
    path: "services",
    element: <Services />,
  },
  {
    name: "Booking",
    path: "booking",
    element: "Booking",
  },
];
