import { Layout, Menu } from "antd";
import React, { ReactNode } from "react";
import { adminPaths } from "../../routes/paths/adminPaths";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { facultyPaths } from "../../routes/paths/facultyPaths";
import { studentPaths } from "../../routes/paths/studentPaths";
import { role } from "../../constant/index.constant";
import { useAppSelector } from "../../redux/hook";

const { Sider } = Layout;

type TSidebarItems = {
  key: string;
  label: ReactNode;
  children?: TSidebarItems[];
};

// type TSidebarProps = {
//   userRole: TRole;
// };

const Sidebar: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  let sidebarItems: TSidebarItems[] = [];
  if (user?.role === role.ADMIN) {
    sidebarItems = sidebarItemsGenerator(adminPaths, user.role);
  }
  if (user?.role === role.FACULTY) {
    sidebarItems = sidebarItemsGenerator(facultyPaths, user.role);
  }
  if (user?.role === role.STUDENT) {
    sidebarItems = sidebarItemsGenerator(studentPaths, user.role);
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
      <h2 className="text-xl md:text-2xl text-white text-center py-2">UMS</h2>
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
