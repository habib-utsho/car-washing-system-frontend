import BestBudget from "../components/homepage/BestBudget";
import FeaturedServices from "../components/homepage/FeaturedServices";
import HelpYouToClean from "../components/homepage/HelpYouToClean";
import HeroSection from "../components/homepage/HeroSection";
import OurServices from "../components/homepage/OurServices";
import { useAppSelector } from "../redux/hook";

const Homepage = () => {
  const { isAuthLoading, token, user } = useAppSelector((state) => state.auth);


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
