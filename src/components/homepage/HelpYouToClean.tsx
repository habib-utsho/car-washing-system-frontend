import Container from "../ui/Container";
import { Button } from "antd";
import { CgArrowTopRight } from "react-icons/cg";

const HelpYouToClean = () => {
  return (
    <div className="border-y border-gray mt-[5px] mb-[50px]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div className="border-b md:border-r border-gray h-full py-8 px-10">
            <h2 className="font-bold text-3xl md:text-5xl">
              We Will Help You to Keep Your Car Always Clean
            </h2>
          </div>
          <div className="space-y-1 p-4">
            <p className="text-slate-500 !mb-[2px]">
              At Cleanify, we’re passionate about giving your car the care it
              deserves. From thorough exterior washes to detailed interior
              cleaning, our team uses eco-friendly products and state-of-the-art
              equipment to leave your vehicle spotless and protected. Experience
              the difference that professional, dedicated care can make.
            </p>

            <Button
              href="/services"
              type="link"
              icon={<CgArrowTopRight />}
              iconPosition="end"
              className={"!px-0 !text-primary"}
            >
              Explore services
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HelpYouToClean;
