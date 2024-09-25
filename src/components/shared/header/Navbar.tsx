import { useState } from "react";
import { ProductOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import { Link } from "react-router-dom";
import Container from "../../ui/Container";
import { GrCompare } from "react-icons/gr";

const items = [
  {
    label: "Services",
    path: "/services",
    icon: <ProductOutlined />,
  },
  {
    label: "Compare",
    icon: <GrCompare />,
    path: "/service/compare",
  },
];
const Navbar = () => {
  const [current, setCurrent] = useState("mail");
  const onClick = (e: any) => {
    // console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <section className="shadow  bg-[#FEFEFF] py-2">
      <Container>
        <div className="flex justify-between flex-wrap gap-4">
          <Menu
            style={{
              border: "0",
              backgroundColor: "#FEFEFF",
              color: "red",
            }}
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            className="min-w-[250px] sm:min-w-[400px] flex-grow"
          >
            {items.map((item, ind) => (
              <Menu.Item key={ind} icon={item?.icon}>
                <Link to={item?.path}>{item?.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
          <Link to={'/services'}>
            <Button
              className="!w-full sm:!w-[200px]"
              block
              size="large"
              type="primary"
            >
              Book now
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
export default Navbar;
