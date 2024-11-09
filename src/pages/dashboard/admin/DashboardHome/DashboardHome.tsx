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
import { Button, Card, Skeleton, Table, Tabs } from "antd";
import "antd/dist/reset.css"; // Import Ant Design CSS
import { useGetAllServicesQuery } from "../../../../redux/features/servicesApi";
import { Pie } from "@ant-design/charts";

const { TabPane } = Tabs;

const DashboardHome = () => {
  const { data: adminStats, isLoading } = useGetAdminStatsQuery(undefined);
  const user = useAppSelector((state) => state.auth.user);

  const {
    data: highestBookedServices,
    isLoading: isLoadingHighestBookedServices,
  } = useGetAllServicesQuery([{ name: "isFeatured", value: true }]);

  console.log(highestBookedServices, "highestBookedServices");

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

  // Data for Best Selling Products
  const columns = [
    {
      title: "Service",
      key: "service",
      render: (text, record) => (
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
      { type: "Available Slots", value: 50 },
      { type: "Booked Slots", value: 250 },
    ],
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ value }) => `${value}`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    tooltip: {
      showTitle: true,
      title: "Order Status",
      formatter: (datum) => ({
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
        formatter: (text, item) => `${item.value}`,
      },
      itemSpacing: 10,
    },
    color: ["#1f77b4", "#ff7f0e"],
  };

  return (
    <div style={{ padding: "24px", background: "#f0f2f5" }}>
      <h2 style={{ marginBottom: "24px" }}>
        Hi <strong className="text-primary">{user?.name}</strong>, Welcome back
        👋
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Overview" key="1">
          {/* {isLoading ? (
            <Skeleton paragraph={{ rows: 5 }} />
          ) : (
            <Row gutter={[16, 24]}>
              <Col span={24} md={12} style={{ marginBottom: "16px" }}>
                <Card>
                  <Statistic
                    title="Total Users"
                    value={adminStats?.data?.totalUsers || 0}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
              <Col span={24} md={12} style={{ marginBottom: "16px" }}>
                <Card>
                  <Statistic
                    title="Total Services"
                    value={adminStats?.data?.totalServices || 0}
                    prefix={<AppstoreOutlined />}
                  />
                </Card>
              </Col>
              <Col span={24} md={8} style={{ marginBottom: "16px" }}>
                <Card>
                  <Statistic
                    title="Total Slots"
                    value={adminStats?.data?.totalSlots || 0}
                    prefix={<CalendarOutlined />}
                  />
                </Card>
              </Col>
              <Col span={24} md={8} style={{ marginBottom: "16px" }}>
                <Card>
                  <Statistic
                    title="Available Slots"
                    value={adminStats?.data?.availableSlots || 0}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={24} md={8} style={{ marginBottom: "16px" }}>
                <Card>
                  <Statistic
                    title="Total Bookings"
                    value={adminStats?.data?.totalBookings || 0}
                    prefix={<BookOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          )} */}

          <Card className="mt-6">
            <h2 className="font-semibold text-xl md:text-2xl mb-2">
              Overall summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {isLoading
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

          {/* Best Selling Products and Product Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
            {/* Best Selling Products */}
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
                loading={isLoadingHighestBookedServices}
                dataSource={highestBookedServices?.data}
                columns={columns}
                pagination={false}
                style={{ width: 800, overflow: "auto" }}
              />
            </div>

            {/* Product Summary Chart */}
            {/* TODO */}
            {isLoadingHighestBookedServices ? (
              <Skeleton paragraph={{ rows: 10 }} />
            ) : (
              <div className="bg-white rounded-md p-4 shadow">
                <h2 className="font-semibold text-xl">Slots Summary</h2>
                <Pie {...slotSummaryConfig} />
              </div>
            )}
          </div>
        </TabPane>
        <TabPane tab="Analytics" key="2" disabled>
          {/* Future Analytics Content */}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DashboardHome;
