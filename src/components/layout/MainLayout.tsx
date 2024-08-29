import { Outlet } from "react-router-dom";
import Header from "../shared/header/Header";
import Navbar from "../shared/header/Navbar";
import { useEffect, useState } from "react";
import { ToTopOutlined } from "@ant-design/icons";
import FromTop from "../helpingCompo/FromTop";
import Footer from "../shared/Footer";

const MainLayout = () => {
  const [isScreenTop, setIsScreenTop] = useState(true);
  const isHomepage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 500) {
        setIsScreenTop(true);
      } else {
        setIsScreenTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="min-h-[80vh]">
        <FromTop>
          <Outlet />
        </FromTop>
      </div>

      <Footer />

      {/* Top to bottom button */}
      {isHomepage && (
        <span
          className={`h-10 w-10 text-white bg-primary flex items-center justify-center text-2xl rounded-full my-shadow-1 transition-all duration-500 ease-in-out cursor-pointer fixed right-2 md:right-4 bottom-2 md:bottom-4 ${
            !isScreenTop
              ? "translate-x-0 opacity-100 hover:opacity-50 scale-[1.02] visible"
              : "translate-x-5 opacity-0 invisible"
          }`}
          onClick={handleToTop}
        >
          <ToTopOutlined />
        </span>
      )}
    </>
  );
};

export default MainLayout;
