import React from "react";
import { Button, Layout } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { signOut } from "../../redux/features/auth/authSlice";
import { TDecodedUser } from "../../types/index.type";

const { Header, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { role } = user as TDecodedUser;

  return (
    <Layout>
      <Sidebar />

      <Layout className="min-h-screen">
        <Header className="bg-white flex justify-between items-center sticky top-0 shadow z-50">
          <h2 className="uppercase text-primary font-bold">{role}</h2>
          <Button onClick={() => dispatch(signOut())} type="default">
            Sign out
          </Button>
        </Header>
        <Content
          style={{ margin: "24px 16px 0" }}
          className="bg-white rounded-lg shadow p-5"
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
