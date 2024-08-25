import { Button, Carousel } from "antd";
import Container from "../ui/Container";
import { Link } from "react-router-dom";
const HeroSection = () => {
  const bannerItems = [
    "https://images.unsplash.com/photo-1640580086296-a6664d19d23d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
    "https://shahsports.com.bd/wp-content/uploads/2024/05/spirit-2.png",
    "https://shahsports.com.bd/wp-content/uploads/2024/05/sole2.png",
    "https://shahsports.com.bd/wp-content/uploads/2024/05/3-1.jpg",
    "https://fitbangladesh.com/public/uploads/all/zwtvUYxdrUyh2MJIpUmbjcSesU3oRjknYAM004w3.png",
    "https://raselsports.com/images/banners/Web-cover.webp",
  ];

  return (
    <div className="py-4">
      <Container>
        <Carousel
          afterChange={(currElem) => console.log(currElem)}
          className="w-full rounded-md text-white"
          arrows
          autoplay
        >
          {bannerItems.map((item, ind) => (
            <Link
              to={"/products"}
              key={ind}
              className="bg-primary h-[400px] cursor-pointer rounded-md"
            >
              <div className="flex items-center justify-center h-full rounded-md">
                <img
                  src={item}
                  alt="Img"
                  className="h-full w-full rounded-md"
                />
              </div>
            </Link>
          ))}
        </Carousel>

      </Container>
    </div>
  );
};

export default HeroSection;
