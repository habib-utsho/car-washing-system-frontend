import { useState } from "react";
import { ProductOutlined, ShopOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import { Link } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import Container from "../../ui/Container";

const items = [
  {
    label: "Shops",
    path: "/shops",
    icon: <ShopOutlined />,
  },
  {
    label: "Services",
    path: "/services",
    icon: <ProductOutlined />,
  },
  {
    label: "Categories",
    path: "/categories",
    icon: <BiCategory />,
  },
  {
    label: "Gedget accessories",
    icon: <FcSettings />,
    path: "",
    children: [
      {
        type: "group",
        label: "mobile",
        children: [
          {
            label: "apple",
            key: "apple",
          },
          {
            label: "samsung",
            key: "samsung",
          },
        ],
      },
      {
        type: "group",
        label: "Laptop",
        children: [
          {
            label: "Hp",
            key: "Hp",
          },
          {
            label: "lenovo",
            key: "lenovo",
          },
        ],
      },
    ],
  },
];
const Navbar = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e: any) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <section className="shadow  bg-[#FEFEFF]">
      <Container>
        <div className="flex justify-between gap-4">
          <Menu
            style={{
              border: "0",
              backgroundColor: "#FEFEFF",
              color: "red",
            }}
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
          >
            {items.map((item, ind) => (
              <Menu.Item key={ind} icon={item?.icon}>
                <Link to={item?.path}>{item?.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
          <div className="flex items-center py-1">
            <Button className="!w-[200px]" block size="large" type="primary">
              Book now
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Navbar;
