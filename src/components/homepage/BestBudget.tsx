import bestBudgetImg from "../../assets/img/bestBudget.png";
import Container from "../ui/Container";

const BestBudget = () => {
  return (
    <div className="bg-black">
      <Container className="grid grid-cols-12 p-4 space-y-2 col-span-8 items-center">
        <div className="col-span-8 text-white space-y-4">
          <h2 className="font-bold text-2xl md:text-5xl">
            Keep Your <span className="text-primary">Car Clean</span> Always
          </h2>
          <p className="text-gray">
            Your car is more than just a vehicle—it's a personal space that
            reflects your style, values, and attention to detail. Keeping your
            car clean isn't just about aesthetics; it's about maintaining the
            health, safety, and longevity of your vehicle. A clean car not only
            looks great but also provides a more comfortable and pleasant
            driving experience. Over time, dust, dirt, and grime can accumulate
            on your car’s exterior and interior surfaces, leading to potential
            damage if not properly addressed. Regular cleaning helps to protect
            your car’s paintwork from harmful contaminants, prevents the
            build-up of bacteria and allergens inside, and preserves the
            condition of your upholstery, carpets, and dashboard. <br /> <br />
            Moreover, a well-maintained car can significantly boost its resale
            value, making it a sound investment in the long run. Whether you're
            preparing for a special event, planning a road trip, or just want to
            enjoy the pride of owning a spotless vehicle, regular car cleaning
            is essential. At our car washing service, we understand the
            importance of a clean car and offer a wide range of services to meet
            all your needs. From express washes that quickly remove surface dirt
            to comprehensive detailing packages that leave no corner untouched,
            we ensure that your car remains in showroom condition, inside and
            out.
            <br /> <br />
            Don’t wait for dirt and debris to take a toll on your vehicle. Make
            cleanliness a priority and enjoy the peace of mind that comes with
            driving a car that’s not only clean but truly cared for. Our team of
            professionals is dedicated to providing top-quality service, using
            the best products and techniques to ensure your car stays
            immaculate. So, whether you’re commuting to work, running errands,
            or heading out on a weekend adventure, you can trust that your car
            will always be ready to shine.
          </p>
        </div>
        <div className="col-span-4">
          <img src={bestBudgetImg} alt="" />
        </div>
      </Container>
    </div>
  );
};

export default BestBudget;
