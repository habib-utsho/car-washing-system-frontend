import { Carousel } from "antd";
import Container from "../ui/Container";
const HeroSection = () => {
  const bannerItems = [
    "https://images.unsplash.com/photo-1640580086296-a6664d19d23d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
    "https://di-uploads-pod10.dealerinspire.com/landrovercharleston/uploads/2021/02/Person-Washing-Car.jpg",
    "https://www.regionalservices.co.uk/wp-content/uploads/elementor/thumbs/Washing-a-Car-scaled-pw3psvd4xuzo6033n97pbt2v64d565es5wlanpwpww.jpeg",
    "https://media.licdn.com/dms/image/C4D12AQETIUA0aqwk-A/article-cover_image-shrink_600_2000/0/1632990510050?e=2147483647&v=beta&t=kotUZ1VyMu2_8Da6QDdXDMqccqn5yWFcmgzhCJV6Wm0",
    "https://www.circlek.com/sites/default/files/2024-03/car_wash_920x575px.jpg",
    "https://d2hucwwplm5rxi.cloudfront.net/wp-content/uploads/2023/07/19044156/Automatic-Car-Wash-Safety-Tip-_-Cover-18-7-23.jpg",
  ];

  return (
    <div className="py-4">
      <Container>
        <Carousel
          // afterChange={(currElem) => console.log(currElem)}
          className="w-full rounded-md text-white"
          arrows
          autoplay
        >
          {bannerItems.map((item, ind) => (
            <div
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
            </div>
          ))}
        </Carousel>
      </Container>
    </div>
  );
};

export default HeroSection;
