import bestBudgetImg from "../../assets/img/bestBudget.png";
import Container from "../ui/Container";

const BestBudget = () => {
  return (
    <div className="bg-black">
      <Container className="grid grid-cols-12 p-4 space-y-2 col-span-8 items-center">
        <div className="col-span-8 text-white space-y-4">
          <h2 className="font-bold text-2xl md:text-4xl">
            Best Budget-Franchise Business For{" "}
            <span className="text-primary">Car Washing Services.</span>
          </h2>
          <p className="text-gray">
            Doorstepwash is all set to capitalise on the boom in the automotive
            sector and has embarked on an exciting journey with its
            best-in-class car wash and cleaning service. The company also offers
            franchise opportunities to small businesses and aspiring young
            entrepreneurs to join its exciting journey as franchisee associates.
            With highly qualified cleaning experts, materials, and technology,
            we provide a 360-degree car washing service. Doorstepwash’s wide
            range of car wash services includes washing, vacuuming, machine
            rubbing, polishing, interior and exterior shampooing, air
            conditioning repair, and detailing among others. Our centres are
            conveniently positioned throughout India's major cities. We offer a
            wide range of services to all models of small cars, hatchbacks,
            sedans, MUVs, 5-seater SUVs, and 7-seater SUVs.It is high time to
            leverage the opportunities being offered by a high-growth segment in
            the Automobile sector- Car washing and cleaning service. The rapidly
            growing segment can make young and energetic people entrepreneurs.We
            utilise only the best cleaning supplies and equipment, including the
            most up-to-date tools and technologies. We provide complete service
            for all models of high-end vehicles including sedans, MUVs, 5-seater
            SUVs, and 7-seater SUVs in all major cities across India. One of the
            most critical components of your high-end vehicle is the air
            conditioning system. If you notice a bad odour emanating from your
            car's vents, you should call our AC maintenance service right once.
            In this area, too, our consumers have expressed complete
            contentment. So make sure to have a look at the most comprehensive
            package we have to offer. Our expert personnel provide the best
            services possible by attending to every detail of washing,
            detailing, and cleanliness. We wish to transform automobile owners'
            perceptions of taking thorough care of their vehicles with our
            exceptional products.
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
