import Container from "../ui/Container";
import { Button } from "antd";
import { CgArrowTopRight } from "react-icons/cg";

const HelpYouToClean = () => {
  return (
    <div className="border-y border-gray mt-[30px] mb-[50px]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div className="border-b md:border-r border-gray h-full py-14 px-10">
            <h2 className="font-bold text-3xl md:text-5xl">
              We Will Help You to Keep Your Car Always Clean
            </h2>
          </div>
          <div className="space-y-2 p-4">
            <p className="text-slate-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Inventore, modi eveniet eos atque, fugiat quibusdam saepe
              laudantium earum deleniti doloribus, quisquam accusantium!
              Aspernatur quis iure quia sunt facilis est fuga!
            </p>

            <Button
              className=""
              type="link"
              icon={<CgArrowTopRight />}
              iconPosition="end"
            >
              Learn more
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HelpYouToClean;
