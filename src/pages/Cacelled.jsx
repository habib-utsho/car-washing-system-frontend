import { Link } from "react-router-dom";
import { Button, Result } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const Cancelled = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-slate-50">
      <div className="w-full max-w-md">
        <Result
          className="my-shadow-1 bg-white rounded-md"
          icon={
            <CloseCircleFilled style={{ color: "#FF0000", fontSize: "65px" }} />
          }
          title="Order Cancelled"
          subTitle="Your booking has been cancelled. If this was a mistake, please contact support or try placing your booking again."
          extra={[
            <div className="flex items-center justify-center gap-2" key="cta">
              <Button type="default" size="large">
                <Link to="/user/dashboard/booking">View booking</Link>
              </Button>
              <Button type="primary" size="large">
                <Link to="/services">More services</Link>
              </Button>
            </div>,
          ]}
        />
      </div>
    </div>
  );
};

export default Cancelled;
