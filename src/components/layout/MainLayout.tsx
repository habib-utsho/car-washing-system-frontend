import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Header from "../shared/header/Header";
import Navbar from "../shared/header/Navbar";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Navbar />

      <div className="min-h-[80vh]">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default MainLayout;
