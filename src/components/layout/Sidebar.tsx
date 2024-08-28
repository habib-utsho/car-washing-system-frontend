import { Layout, Menu } from "antd";
import React, { ReactNode } from "react";
import { adminPaths } from "../../routes/paths/adminPaths";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { useAppSelector } from "../../redux/hook";
import { role } from "../../constant/index.constant";
import { userPaths } from "../../routes/paths/userPaths";
import { MdEmail } from "react-icons/md";
import { MailFilled, MailOutlined, PhoneFilled } from "@ant-design/icons";

const { Sider } = Layout;

type TSidebarItems = {
  key: string;
  label: ReactNode;
  children?: TSidebarItems[];
};

const Sidebar: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { name, img, phone, email } = user || {};

  let sidebarItems: TSidebarItems[] = [];
  if (user?.role === role.ADMIN) {
    sidebarItems = sidebarItemsGenerator(adminPaths, user?.role);
  }
  if (user?.role === role.USER) {
    sidebarItems = sidebarItemsGenerator(userPaths, user?.role);
  }

  return (
    <Sider
      collapsible
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      className="!h-screen !sticky !top-0"
    >
      <div className="demo-logo-vertical" />
      <div className="mb-6 space-y-2 mt-4 mx-3">
        <img src={img} alt={name} className="w-full rounded-md h-[150px]" />
        <h2 className="text-gray">
          <MailFilled /> {email}
        </h2>
        <p className="text-gray">
          <PhoneFilled /> {phone}
        </p>
      </div>

      <Menu
        // onClick={({ key }) => {
        //   key ? navigate(key) : navigate("/dashboard");
        // }}
        theme="dark"
        // defaultSelectedKeys={["Dashboard"]}
        mode="inline"
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
