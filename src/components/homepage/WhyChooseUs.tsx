import { Button } from "antd";
import {
  CheckCircleOutlined,
  ToolOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  StarOutlined,
  DollarOutlined,
} from "@ant-design/icons"; // Import different icons from Ant Design
import whyChooseUsIllustration from "../../assets/img/whyChooseUs/whyChooseUs2.png";
import Container from "../ui/Container";
import MyMotion from "../helpingCompo/MyMotion";

const WhyChooseUs = () => {
  return (
    <section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold">Why Choose Us?</h2>
            <p className="text-lg text-gray-500">
              We are the best in the business, with years of experience, we are
              the best choice for you.
            </p>
            <ul className="list-disc list-inside space-y-4">
              <li>24/7 Emergency Service</li>
              <li>Fast Response Time</li>
              <li>Professional Service</li>
              <li>Competitive Pricing</li>
            </ul>

            <Button
              type="primary"
              size="large"
              href="/services"
              className="mt-4"
            >
              {" "}
              Explore Services{" "}
            </Button>
          </div>
          <div className="order-1 md:order-2">
            <img
              src={whyChooseUsIllustration}
              alt="Why Choose Us"
              className="w-full"
            />
          </div>
        </div>
      </Container>
      <div className="bg-secondary text-white py-[72px] md:py-[95px] mt-2">
        <Container className=" relative">
          <MyMotion x={-50}>
            <div className="!w-[330px] bg-primary-500 rounded-md my-shadow-1 space-y-4 p-6 absolute right-[35px] md:right-[80px] lg:right-[100px] xl:right-[140px] -top-[195px] hidden sm:block">
              <h2 className="text-xl md:text-2xl font-semibold text-black">
                Get Started with Us
              </h2>
              <div className="space-y-[6px]">
                {[
                  "Book an appointment now",
                  "Quick and convenient scheduling",
                  "Eco-friendly cleaning options",
                  "Professional detailing available",
                ]?.map((item, index) => (
                  <p key={index} className="text-sm text-slate-800 !mb-0">
                    {item}
                  </p>
                ))}
              </div>

              <Button
                size="large"
                block
                className="bg-secondary text-white"
                href="/services"
              >
                Get Started Now
              </Button>
            </div>
          </MyMotion>

          <div>
            <h2 className="text-xl md:text-2xl font-semibold">
              Your Car is Our Car
            </h2>
            <p className="text-lg text-gray">
              We treat your car as if it were our own. <br /> Our team of
              professionals ensures that your car gets the best treatment
              possible.
            </p>

            <div className="my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center p-4">
                <ToolOutlined className="text-2xl mr-2 text-primary" />
                <span>State-of-the-art equipment</span>
              </div>
              <div className="flex items-center p-4">
                <EnvironmentOutlined className="text-2xl mr-2 text-primary" />
                <span>Eco-friendly cleaning products</span>
              </div>
              <div className="flex items-center p-4">
                <TeamOutlined className="text-2xl mr-2 text-primary" />
                <span>Highly trained staff</span>
              </div>
              <div className="flex items-center p-4">
                <StarOutlined className="text-2xl mr-2 text-primary" />
                <span>Attention to detail</span>
              </div>
              <div className="flex items-center p-4">
                <CheckCircleOutlined className="text-2xl mr-2 text-primary" />
                <span>Customer satisfaction</span>
              </div>
              <div className="flex items-center p-4">
                <DollarOutlined className="text-2xl mr-2 text-primary" />
                <span>Affordable pricing</span>
              </div>
            </div>
            <Button
              type="primary"
              size="large"
              href="/about-us"
              className="mt-4"
            >
              {" "}
              Learn More About Us{" "}
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default WhyChooseUs;
