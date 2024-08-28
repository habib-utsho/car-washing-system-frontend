import BestBudget from "../components/homepage/BestBudget";
import FeaturedServices from "../components/homepage/FeaturedServices";
import HelpYouToClean from "../components/homepage/HelpYouToClean";
import HeroSection from "../components/homepage/HeroSection";
import OurServices from "../components/homepage/OurServices";

const Homepage = () => {


  return (
    <>
      <HeroSection />
      <HelpYouToClean />
      <BestBudget />
      <FeaturedServices />
      <OurServices />
    </>
  );
};

export default Homepage;
