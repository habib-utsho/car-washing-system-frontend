import { useState } from "react";
// import jwtDecode from 'jwt-decode';
import { Menu, Dropdown, Skeleton } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import Container from "../../ui/Container";
import { BsWhatsapp } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { signOut } from "../../../redux/features/auth/authSlice";

const Header = ({}) => {
  const [cartDrawerVisible, setCartDrawerVisible] = useState(false);

  const { user, isAuthLoading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleCartDrawerOpen = () => {
    setCartDrawerVisible(true);
  };

  const handleCartDrawerClose = () => {
    setCartDrawerVisible(false);
  };

  const authenticatedRoutes = [
    {
      key: "1",
      label: <Link to={`/${user?.role}/dashboard`}>Dashboard</Link>,
      icon: <DashboardOutlined />,
    },
    {
      key: "2",
      label: <Link to={`/${user?.role}/dashboard/profile`}>My profile</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "4",
      label: "Sign Out",
      icon: <LogoutOutlined />,
      onClick: () => dispatch(signOut()),
    },
  ];

  const rightMenu = (
    <Menu
      mode="horizontal"
      // style={{
      //   backgroundColor: "#FEFEFF",
      //   borderRadius: "6px",
      //   border: "0",
      // }}
      className="py-1 rounded-md justify-end px-2"
    >
      <p className="flex items-center gap-1 mr-4 mb-0">
        Call us now:
        <Link to="tel:+8801706785160">+880170678-5160</Link>
      </p>
      <Menu.Item
        key="Whats app"
        icon={
          <Link to="tel:+8801706785160">
            <BsWhatsapp />{" "}
          </Link>
        }
      ></Menu.Item>

      {isAuthLoading ? (
        <div className="flex items-center justify-center w-[70px] pr-[25px]">
          <Skeleton.Button active className="!h-6 !w-10" />
        </div>
      ) : user ? (
        <Menu.Item key="account" icon={<UserOutlined />}>
          <Dropdown
            menu={{ items: authenticatedRoutes }}
            placement="bottom"
            overlayStyle={{ zIndex: 5000001, paddingTop: "22px" }}
            //  overlayClassName="custom-dropdown"
          >
            <span>Account</span>
          </Dropdown>
        </Menu.Item>
      ) : (
        <Menu.Item key="login" icon={<UserOutlined />}>
          <Link to="/signin"></Link>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <>
      <section className="shadow-sm  py-1 sticky top-0 !z-[5000000] bg-primary">
        <Container>
          <div className="flex justify-between flex-wrap">
            <Link to="/" className="navbar-left">
              <img src={logo} alt="Logo" style={{ height: "50px" }} />
            </Link>
            <div className="mx-auto sm:mx-0 ">{rightMenu}</div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Header;
