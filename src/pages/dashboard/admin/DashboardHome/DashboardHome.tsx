import {
  AppstoreOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  RightCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useGetAdminStatsQuery } from "../../../../redux/features/statsApi";
import { useAppSelector } from "../../../../redux/hook";
import { Button, Card, Select, Skeleton, Table, Tabs } from "antd";
import "antd/dist/reset.css"; // Import Ant Design CSS
import { useGetAllServicesQuery } from "../../../../redux/features/servicesApi";
import { Line, Pie } from "@ant-design/charts";
import { useState } from "react";
import { useGetAllBookingQuery } from "../../../../redux/features/bookingApi";
import { TBooking } from "../../../../types/booking.type";
import worldMap from "../../../../assets/img/dashboard/world_map.png";
import moment from "moment";
import { ColumnsType } from "antd/es/table";
import { TService } from "../../../../types/service.type";

const { TabPane } = Tabs;

const DashboardHome = () => {
  const { data: adminStats, isLoading: isLoadingStats } =
    useGetAdminStatsQuery(undefined);
  const user = useAppSelector((state) => state.auth.user);

  const { data: featuredServices, isLoading: isLoadingFeaturedServices } =
    useGetAllServicesQuery([{ name: "isFeatured", value: true }]);
  const { data: latestBooking, isLoading: isLoadingLatestBookings } =
    useGetAllBookingQuery([]);
  const { data: bookings, isLoading: isLoadingAllBookings } =
    useGetAllBookingQuery([{ name: "limit", value: 5000000 }]);

  const stats = [
    {
      amount: `${adminStats?.data?.totalUsers || 0}`,
      title: "Total Users",
      icon: <UserOutlined />,
      background: "#ffe2e5",
      iconBackground: "#fa5a7d",
    },
    {
      amount: `${adminStats?.data?.totalServices || 0}`,
      title: "Total Services",
      icon: <AppstoreOutlined />,
      background: "#fff4de",
      iconBackground: "#ff947a",
    },
    {
      amount: `${adminStats?.data?.totalSlots || 0}`,
      title: "Total Slots",
      icon: <CalendarOutlined />,
      background: "#dcfce7",
      iconBackground: "#3cd856",
    },
    {
      amount: `${adminStats?.data?.availableSlots || 0}`,
      title: "Available Slots",
      icon: <CheckCircleOutlined />,
      background: "#f3e8ff",
      iconBackground: "#bf83ff",
    },
    {
      amount: `${adminStats?.data?.upcomingSlots || 0}`,
      title: "Upcoming Slots",
      icon: <CalendarOutlined />,
      background: "#f0f8ff",
      iconBackground: "#008080",
    },
    {
      amount: `${adminStats?.data?.totalBookings || 0}`,
      title: "Total Bookings",
      icon: <BookOutlined />,
      background: "#e7edff",
      iconBackground: "#396aff",
    },
    // {
    //   amount: dashboardStats?.data?.merchantDue,
    //   title: "Merchant due",
    //   icon: <FaBangladeshiTakaSign />,
    //   background: "#f0f8ff",
    //   iconBackground: "#008080",
    //   description: "Lifetime",
    // },
    // {
    //   amount: dashboardStats?.data?.icchaproronDue,
    //   title: "Icchaporon due",
    //   icon: <FaBangladeshiTakaSign />,
    //   description: "Lifetime",
    //   background: "#f3e8ff",
    //   iconBackground: "#93278f",
    // },
  ];

  // Data for featured services table
  const columns: ColumnsType<TService> = [
    {
      title: "Service",
      key: "service",
      render: (record) => (
        <div className="flex items-center">
          <img
            src={record.img}
            alt={record.name}
            className="w-10 h-10 rounded-full mr-2"
          />
          {record.name}
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
  ];

  const slotSummaryConfig = {
    appendPadding: 10,
    data: [
      { type: "Upcoming Slots", value: adminStats?.data?.upcomingSlots || 0 },
      { type: "Available Slots", value: adminStats?.data?.availableSlots || 0 },
      { type: "Booked Slots", value: adminStats?.data?.totalBookings || 0 },
    ],
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ value }: { value: number }) => `${value}`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    tooltip: {
      showTitle: true,
      title: "Order Status",
      formatter: (datum: { type: string; value: number }) => ({
        name: datum.type,
        value: datum.value,
      }),
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    legend: {
      position: "right",
      layout: "vertical",
      itemName: {
        style: {
          fontSize: 14,
          fontWeight: "bold",
        },
      },
      itemValue: {
        style: {
          fontSize: 14,
        },
        formatter: (item: { value: number }) => `${item.value}`,
      },
      itemSpacing: 10,
    },
    color: ["#1f77b4", "#ff7f0e"],
    height: 300,
  };

  // Latest booking columns
  const latestBookingsColumns: ColumnsType<TBooking> = [
    {
      title: "Customer",
      key: "customer",
      dataIndex: "customer",
      render: (customer) => (
        <div className="flex items-center">
          <img
            src={customer.img}
            alt={customer.name}
            className="w-10 h-10 rounded-full mr-2"
          />
          {customer.name}
        </div>
      ),
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (service) => (
        <div className="flex items-center">
          <img
            src={service.img}
            alt={service.name}
            className="w-10 h-10 rounded-full mr-2"
          />
          {service.name}
        </div>
      ),
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "service",
      render: (service) => (
        <div className="flex items-center">{service.price}</div>
      ),
    },
    {
      title: "Duration",
      key: "duration",
      dataIndex: "service",
      render: (service) => (
        <div className="flex items-center">{service.duration}</div>
      ),
    },
    {
      title: "Booking Date",
      key: "slot",
      dataIndex: "slot",
      render: (slot) => (
        <div className="flex items-center">
          {moment(slot?.date).format("Do MMM, YYYY")}
        </div>
      ),
    },
    {
      title: "Vehicle Type",
      key: "vehicleType",
      dataIndex: "vehicleType",
    },
    {
      title: "Vehicle Brand",
      key: "vehicleBrand",
      dataIndex: "vehicleBrand",
    },
    {
      title: "Vehicle Model",
      key: "vehicleModel",
      dataIndex: "vehicleModel",
    },
    {
      title: "Manufacturing Year",
      key: "manufacturingYear",
      dataIndex: "manufacturingYear",
    },
    {
      title: "Registration Plate",
      key: "registrationPlate",
      dataIndex: "registrationPlate",
    },
  ];

  // Data for Satisfy vs Fulfill Customer (Bar Chart)
  const barData = [
    { category: "Vol", value: 1135 },
    { category: "Services", value: 635 },
  ];

  const barConfig = {
    data: barData,
    xField: "category",
    yField: "value",
    height: 300,
    colorField: "category",
    color: ["#36a2eb", "#ff6384"],
  };

  // Booking analytics [2nd tab]
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonthIndex = new Date().getMonth();
  const [slotBookingDetailsActiveMonth, setSlotBookingDetailsActiveMonth] =
    useState<keyof typeof monthMap>(
      months[currentMonthIndex] as keyof typeof monthMap
    );

  // Month mapping for easier comparison

  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  // Get the index of the active month
  const activeMonthIndex = monthMap[slotBookingDetailsActiveMonth];

  // Group orders by day for the active month and count occurrences
  interface SlotsCounts {
    [key: number]: number;
  }
  const bookingCounts: SlotsCounts = bookings?.data?.reduce(
    (acc: SlotsCounts, booking: TBooking) => {
      const date = new Date(booking.createdAt);
      const day = date.getDate(); // Get the day (1-30)
      const monthIndex = date.getMonth(); // Get the month index (0-11)

      // Only include orders from the active month
      if (monthIndex === activeMonthIndex) {
        acc[day] = (acc[day] || 0) + 1; // Increment count for that day
      }
      return acc;
    },
    {}
  );

  // Convert grouped data to an array of objects suitable for the chart
  const lineData = Array.from({ length: 30 }, (_, index) => {
    const day = index + 1; // Days range from 1 to 30
    return {
      date: day,
      value: bookingCounts?.[day] || 0, // Use order count or 0 if no orders
    };
  });
  const lineConfig = {
    data: lineData,
    xField: "date", // The x-axis will show the day of the month
    yField: "value", // The y-axis will show the count of orders for that day
    smooth: true,
    height: 300,
  };

  return (
    <div style={{ padding: "24px", background: "#f0f2f5" }}>
      <h2
        style={{ marginBottom: "24px" }}
        className="font-bold text-xl md:text-2xl"
      >
        Hi <strong className="text-primary">{user?.name}</strong>, Welcome back
        in Admin Dashboard 👋
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Overview" key="1">
          <Card className="mt-6">
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Overall summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {isLoadingStats
                ? Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton.Button
                      key={index}
                      className="!h-[180px] !w-full rounded-xl"
                      active
                    />
                  ))
                : stats.map((stat, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl flex justify-between shadow-sm"
                      style={{ backgroundColor: stat.background }}
                    >
                      <div className="space-y-2">
                        <div
                          className="rounded-full h-10 w-10 flex items-center justify-center text-white text-2xl"
                          style={{ backgroundColor: stat.iconBackground }}
                        >
                          {stat.icon}
                        </div>
                        <div className="text-xl font-semibold">
                          {stat.amount}
                        </div>
                        <h3 className="text-md font-semibold">{stat.title}</h3>
                      </div>
                    </div>
                  ))}
            </div>
          </Card>

          {/* Latest bookings */}
          <div className="bg-white rounded-md p-4 shadow my-[50px] md:my-[60px]">
            <h2 className="font-semibold text-xl">Latest Bookings</h2>
            <Table
              loading={isLoadingLatestBookings}
              dataSource={latestBooking?.data?.slice(0, 10)}
              columns={latestBookingsColumns}
              pagination={false}
              style={{ maxWidth: "full", overflow: "auto" }}
              // className="!w-[800px] md:max-w-full"
            />
          </div>

          {/* Grid for latest bookings, booking Mapping, Satisfy vs Fulfill */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* TODO */}
            {isLoadingFeaturedServices || isLoadingStats ? (
              <Skeleton paragraph={{ rows: 10 }} />
            ) : (
              <div className="bg-white rounded-md p-4 shadow">
                <h2 className="font-semibold text-xl">Slots Summary</h2>
                <Pie {...slotSummaryConfig} />
              </div>
            )}

            {/* Sales Mapping by Areas Section */}
            <div className="bg-white rounded-md p-4 shadow space-y-4">
              <h2 className="font-semibold text-xl">Sales Mapping by Areas</h2>
              <img src={worldMap} alt="world map" className="w-full h-auto" />
            </div>

            {/* Satisfy vs Fulfill Customer Section */}
            <div className="bg-white rounded-md p-4 shadow">
              <h2 className="font-semibold text-xl">
                Satisfy vs Fulfill Customer
              </h2>
              <Pie {...barConfig} />
            </div>
          </div>

          {/* Featured services */}
          <div className="bg-white rounded-md p-4 shadow space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-xl">Featured Services</h2>
              <Button
                type="link"
                className="text-slate-500 flex items-center gap-1"
              >
                More <RightCircleOutlined />
              </Button>
            </div>
            <Table
              loading={isLoadingFeaturedServices}
              dataSource={featuredServices?.data}
              columns={columns}
              pagination={false}
              style={{ width: "full", overflow: "auto" }}
            />
          </div>
        </TabPane>

        <TabPane tab="Analytics" key="2">
          {/* Booking Analytics */}
          <div className="bg-white rounded-md p-4 shadow mb-6 space-y-6">
            <div className="flex justify-between gap-4 flex-wrap">
              <h2 className="font-semibold text-xl">Monthly Booking Details</h2>
              <Select
                placeholder="Select month"
                value={slotBookingDetailsActiveMonth}
                onChange={(value) => setSlotBookingDetailsActiveMonth(value)}
              >
                {months.slice(0, currentMonthIndex + 1).map((month) => (
                  <Select.Option key={month}>{month}</Select.Option>
                ))}
              </Select>
            </div>
            {isLoadingAllBookings ? (
              <Skeleton paragraph={{ rows: 14 }} />
            ) : (
              <div
                style={{ width: "100%", maxWidth: "800px", overflowX: "auto" }}
              >
                <Line {...lineConfig} />
              </div>
            )}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DashboardHome;
