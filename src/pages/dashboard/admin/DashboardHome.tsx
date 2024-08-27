import React from "react";
import { useGetAdminStatsQuery } from "../../../redux/features/statsApi";

const DashboardHome = () => {
  const { data: adminiStats } = useGetAdminStatsQuery(undefined);

  console.log(adminiStats, "adminiStats");

  return <div>This is admin home</div>;
};

export default DashboardHome;
