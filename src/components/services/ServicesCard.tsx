/* eslint-disable react/prop-types */
import { Button, Card } from "antd";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { TService } from "../../types/service.type";
import { ClockCircleOutlined } from "@ant-design/icons";

type TServiceCard = {
  service: TService;
};

const ServiceCard: React.FC<TServiceCard> = ({ service }) => {
  // const { products: cartItems } = useAppSelector((state) => state.cart);

  // const handleBook = (service: TService) => {
  //   const existService = cartItems.find((item) => item._id === service._id);

  //   if (
  //     service?.stock > (existService?.quantity || 0) &&
  //     Number(service.stock) !== 0
  //   ) {
  //     dispatch(addToCart(service));
  //     message.success("Service added to cart");
  //     return;
  //   }

  //   message.error("Out of stock");
  // };

  return (
    <div>
      <Card
        className="min-h-[315px] relative pb-10 space-y-4"
        cover={
          <Link
            to={`/services/${service?._id}`}
            className="group inline-block overflow-hidden cursor-pointer"
          >
            <img
              src={
                service?.img ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw3OdJ3nAPLc94ubUz-4AvNAz_0IzTkNBSqQ&s" // TODO
              }
              alt={service?.name}
              className="w-full h-[200px] rounded-t-md group-hover:scale-[1.07] transition-all duration-500 object-cover"
            />
          </Link>
        }
      >
        <Link
          to={`/services/${service?._id}`}
          className="font-semibold text-[16px] min-h-[50px] inline-block mb-1 hover:text-primary-2 line-clamp-2 w-full hover:text-primary"
        >
          {service?.name}
        </Link>

        <Card.Meta
          title={
            <>
              <div className="flex items-end gap-2">
                <p className="font-semibold mb-0">
                  <span className="">৳ {service?.price}</span>
                </p>
              </div>
              <p className=" font-normal">
                <ClockCircleOutlined /> {service?.duration} mins
              </p>
            </>
          }
        />

        <Link to={`/services/${service?._id}`}>
          <Button
            style={{
              marginTop: "10px",
            }}
            // onClick={() => handleBook(service)}
            icon={<BsCartPlus />}
            block
            type="default"
            className="!absolute bottom-2 left-0 right-0 !w-[80%] mx-auto"
            disabled={service?.isDeleted}
          >
            Book slot
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default ServiceCard;
