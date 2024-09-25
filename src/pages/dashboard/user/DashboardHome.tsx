import {
  AppstoreOutlined,
  BookOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useGetUserStatsQuery } from "../../../redux/features/statsApi";
import { useAppSelector } from "../../../redux/hook";
import { Card, Col, Row, Skeleton, Statistic, Tabs } from "antd";
import "antd/dist/reset.css"; // Import Ant Design CSS

const { TabPane } = Tabs;

//TODO: Showing admin stats now, replace it to for user stats
const DashboardHome = () => {
  const { data: userStats, isLoading } = useGetUserStatsQuery(undefined);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div style={{ padding: "24px", background: "#f0f2f5" }}>
      <h2 style={{ marginBottom: "24px" }}>
        Hi <strong className="text-primary">{user?.name}</strong>, Welcome back
        👋
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Overview" key="1">
          {isLoading ? (
            <Skeleton paragraph={{ rows: 5 }} />
          ) : (
            <Row gutter={[16, 24]}>
              <Col span={24} md={8} style={{ marginBottom: "16px" }}>
                <Card className="border border-primary my-shadow-1">
                  <Statistic
                    title="Total Services"
                    value={userStats?.data?.totalServices || 0}
                    prefix={<AppstoreOutlined />}
                  />
                </Card>
              </Col>
              <Col span={24} md={8} style={{ marginBottom: "16px" }}>
                <Card className="border border-primary my-shadow-1">
                  <Statistic
                    title="Available Slots"
                    value={userStats?.data?.availableSlots || 0}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={24} md={8} style={{ marginBottom: "16px" }}>
                <Card className="border border-primary my-shadow-1">
                  <Statistic
                    title="My Total Bookings"
                    value={userStats?.data?.totalBookings || 0}
                    prefix={<BookOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          )}
        </TabPane>
        <TabPane tab="Analytics" key="2" disabled>
          {/* Future Analytics Content */}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DashboardHome;
