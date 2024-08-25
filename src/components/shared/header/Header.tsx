import { useState } from "react";
// import jwtDecode from 'jwt-decode';
import { Menu, Dropdown, Col, Row, Skeleton } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import Container from "../../ui/Container";
import { BsWhatsapp } from "react-icons/bs";

const Header = ({}) => {
  const [cartDrawerVisible, setCartDrawerVisible] = useState(false);

  const authData = {
    user: null,
    isAuthLoading: false,
  };

  const handleCartDrawerOpen = () => {
    setCartDrawerVisible(true);
  };

  const handleCartDrawerClose = () => {
    setCartDrawerVisible(false);
  };

  const authenticatedRoutes = [
    {
      key: "1",
      label: <Link to="/dashboard/orders">Dashboard</Link>,
      icon: <DashboardOutlined />,
    },
    {
      key: "2",
      label: <Link to="/dashboard/orders">My orders</Link>,
      icon: <ShoppingOutlined />,
    },
    {
      key: "4",
      label: "Sign Out",
      icon: <LogoutOutlined />,
      // onClick: () => dispatch(signOut()),
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
      className="py-1 rounded-md justify-end"
    >
      <p className="flex items-center gap-1 mr-4">
        Call us now:
        <Link to="tel:+8801706785160">+880170678-5160</Link>
      </p>
      <Menu.Item key="offer" icon={<GiftOutlined />}></Menu.Item>
      <Menu.Item key="Whats app" icon={<BsWhatsapp />}></Menu.Item>

      {authData?.isAuthLoading ? (
        <div className="flex items-center justify-center w-[70px] pr-[25px]">
          <Skeleton.Button active className="!h-6 !w-10" />
        </div>
      ) : authData?.user ? (
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
      <section className="shadow-sm  py-2 sticky top-0 !z-[5000000] bg-primary">
        <Container>
          <div className="navbar-container">
            <Row align="middle" gutter={[16, 16]}>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Link to="/" className="navbar-left">
                  <img src={logo} alt="Logo" style={{ height: "50px" }} />
                </Link>
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}></Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <div className="navbar-right">{rightMenu}</div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Header;
