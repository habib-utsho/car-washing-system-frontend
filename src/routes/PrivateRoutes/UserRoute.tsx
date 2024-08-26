import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { Navigate } from "react-router-dom";
import { Skeleton } from "antd";

const UserRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthLoading, token, user } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to={"/"} replace />; //TODO back to location history
  }

  if (user?.role != "user") {
    return <Navigate to={"/"} replace />; //TODO back to location history
  }

  if (isAuthLoading) {
    return <Skeleton.Button className="!h-screen !w-full" />;
  }

  return children;
};

export default UserRoute;
