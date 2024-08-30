import { Link } from "react-router-dom";
import { Button, Result } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-slate-50">
      <div className="w-full max-w-md">
        <Result
          className="my-shadow-1 bg-white rounded-md"
          icon={
            <CheckCircleFilled style={{ color: "#32CD32", fontSize: "65px" }} />
          }
          title="Your booking has been placed successfully!"
          subTitle="Thank you for booking. You will receive an email confirmation shortly."
          extra={[
            <div className="flex items-center justify-center gap-2" key={"cta"}>
              <Button type="default" size="large" key="order">
                <Link to="/user/dashboard/booking">My bookings</Link>
              </Button>
              <Button type="primary" size="large" key="home">
                <Link to="/services">Book more</Link>
              </Button>
            </div>,
          ]}
        />
      </div>
    </div>
  );
};

export default Success;
