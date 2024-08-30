import { Link } from "react-router-dom";
import { Button, Result } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const Failed = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-slate-50">
      <div className="w-full max-w-md">
        <Result
          className="my-shadow-1 bg-white rounded-md"
          icon={
            <CloseCircleFilled style={{ color: "#FF0000", fontSize: "65px" }} />
          }
          title="Your booking has been failed!"
          subTitle="Sorry, your booking has been failed. Please try again."
          extra={[
            <div className="flex items-center justify-center gap-2" key={"cta"}>
              <Button type="default" size="large" key="order">
                <Link to="/services">Try again</Link>
              </Button>
              <Button type="primary" size="large" key="home">
                <Link to="/services">Services</Link>
              </Button>
            </div>,
          ]}
        />
      </div>
    </div>
  );
};

export default Failed;
