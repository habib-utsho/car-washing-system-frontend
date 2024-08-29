import BestBudget from "../components/homepage/BestBudget";
import FeaturedServices from "../components/homepage/FeaturedServices";
import HelpYouToClean from "../components/homepage/HelpYouToClean";
import HeroSection from "../components/homepage/HeroSection";
import OurServices from "../components/homepage/OurServices";
import Review from "../components/homepage/Review";

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <HelpYouToClean />
      <BestBudget />
      <FeaturedServices />
      <Review />
      <OurServices />
    </>
  );
};

export default Homepage;
