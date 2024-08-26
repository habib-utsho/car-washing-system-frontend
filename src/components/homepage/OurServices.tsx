import React from "react";
import Container from "../ui/Container";
import { Button } from "antd";
import { Link } from "react-router-dom";

const OurServices = () => {
  return (
    <div className="">
      <Container className="space-y-4">
        <h2 className="text-cent font-bold text-2xl md:text-4xl text-center">
          Our services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <h2 className="font-bold text-3xl md:text-5xl">
              Point Protected Film
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae libero nemo facilis impedit numquam, ipsam totam nam
              quidem rem minima nihil deserunt commodi quae maiores inventore
              aliquam tenetur, delectus ab.
            </p>
            <Button type="default">
              <Link to={"/services"}>Services</Link>
            </Button>
          </div>

          <div></div>
        </div>
      </Container>
    </div>
  );
};

export default OurServices;
