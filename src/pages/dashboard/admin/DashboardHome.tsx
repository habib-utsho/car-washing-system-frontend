import { AppstoreOutlined, BookOutlined, CalendarOutlined, CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useGetAdminStatsQuery } from "../../../redux/features/statsApi";
import { useAppSelector } from "../../../redux/hook";
import { Card, Col, Row, Skeleton, Statistic, Tabs } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design CSS

const { TabPane } = Tabs;

const DashboardHome = () => {
  const { data: adminStats, isLoading } = useGetAdminStatsQuery(undefined);
  const user = useAppSelector(state => state.auth.user);

  return (
    <div style={{ padding: '24px', background: '#f0f2f5' }}>
      <h2 style={{ marginBottom: '24px' }}>
        Hi <strong className="text-primary">{user?.name}</strong>, Welcome back 👋
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Overview" key="1">
          {isLoading ? (
            <Skeleton paragraph={{ rows: 5 }} />
          ) : (
            <Row gutter={[16, 24]}>
              <Col span={24} md={12} style={{ marginBottom: '16px' }}>
                <Card>
                  <Statistic
                    title="Total Users"
                    value={adminStats?.data?.totalUsers || 0}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
              <Col span={24} md={12} style={{ marginBottom: '16px' }}>
                <Card>
                  <Statistic
                    title="Total Services"
                    value={adminStats?.data?.totalServices || 0}
                    prefix={<AppstoreOutlined />}
                  />
                </Card>
              </Col>
              <Col span={24} md={8} style={{ marginBottom: '16px' }}>
                <Card>
                  <Statistic
                    title="Total Slots"
                    value={adminStats?.data?.totalSlots || 0}
                    prefix={<CalendarOutlined />}
                  />
                </Card>
              </Col>
              <Col span={24} md={8} style={{ marginBottom: '16px' }}>
                <Card>
                  <Statistic
                    title="Available Slots"
                    value={adminStats?.data?.availableSlots || 0}
                    prefix={<CheckCircleOutlined />}
                  />
                </Card>
              </Col>
              <Col span={24} md={8} style={{ marginBottom: '16px' }}>
                <Card>
                  <Statistic
                    title="Total Bookings"
                    value={adminStats?.data?.totalBookings || 0}
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
