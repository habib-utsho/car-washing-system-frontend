import Container from "../ui/Container";
import foamWashImg from "../../assets/img/provideService/Foam_Wash_5c7be7ab1a.webp";
import polishImg from "../../assets/img/provideService/Underbody_and_Wheel_Clean_72f48f7438.webp";
import underbodyAndWheelImg from "../../assets/img/provideService/Underbody_and_Wheel_Clean_72f48f7438.webp";
import superDryImg from "../../assets/img/provideService/Super_Dry_5c5af34ddb.webp";
import biodegradableImg from "../../assets/img/provideService/Biodegradable_Soap_a784c88ab9.webp";
import recycledImg from "../../assets/img/provideService/Recycled_Water_f9a87d9848.webp";
import MyMotion from "../helpingCompo/MyMotion";

const OurServices = () => {
  const services = [
    {
      name: "Foam Wash",
      descriptions:
        "Applied to soak up dirt acting as a strong detergent to remove even the most stubborn dirt.",
      img: foamWashImg,
    },
    {
      name: "Polish",
      descriptions:
        "Helps to prevent dirt clinging to your car's surface and revitalises your paint job.",
      img: polishImg,
    },
    {
      name: "Underbody and Wheel Clean",
      descriptions:
        "Cleans the underneath of your vehicle and wheels using a precision system.",
      img: underbodyAndWheelImg,
    },
    {
      name: "Super Dry",
      descriptions: "Powerful dryer to remove excess water.",
      img: superDryImg,
    },
    {
      name: "Biodegradable Soap",
      descriptions: "Our car wash facilities recycle 85% of our water.",
      img: biodegradableImg,
    },
    {
      name: "Recycled Water",
      descriptions: "Our car wash facilities recycle 85% of our water.",
      img: recycledImg,
    },
  ];
  return (
    <div className="">
      <Container className="space-y-8">
        <div className="text-center">
          <div className="flex items-center gap-2 justify-center text-slate-700">
            <span className="h-[1.5px] w-[25px] bg-slate-700"></span>
            <p>Our services</p>
          </div>
          <h2 className="text-cent font-bold text-2xl md:text-4xl text-center">
            Service we provide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <MyMotion y={50}>
              <div
                key={index}
                className="rounded-md overflow-hidden my-shadow-1 bg-white"
              >
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-[250px] h-auto mx-auto"
                />
                <div className="p-4 space-y-2 mt-2">
                  <h2 className="font-semibold text-xl line-clamp-1">
                    {service.name}
                  </h2>
                  <p className="text-slate-700 text-sm line-clamp-2">
                    {service.descriptions}
                  </p>
                </div>
              </div>
            </MyMotion>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default OurServices;
