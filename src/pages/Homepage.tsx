import BestBudget from "../components/homepage/BestBudget";
import FeaturedServices from "../components/homepage/FeaturedServices";
import HelpYouToClean from "../components/homepage/HelpYouToClean";
import HeroSection from "../components/homepage/HeroSection/HeroSection";
import OurServices from "../components/homepage/OurServices";
import Testimonial from "../components/homepage/Testimonial";
import WhyChooseUs from "../components/homepage/WhyChooseUs";

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <HelpYouToClean />
      <BestBudget />
      <FeaturedServices />
      <WhyChooseUs />
      <OurServices />
      {/* <Review /> */}
      <Testimonial />
    </>
  );
};

export default Homepage;
