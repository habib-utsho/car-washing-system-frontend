/* eslint-disable react/prop-types */
import { Button, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { TService } from "../../types/service.type";
import convertMinutesToHour from "../../utils/convertMinutesToHour";

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
        className="min-h-[465px] relative pb-10 space-y-4"
        cover={
          <img
            style={{ height: 200, objectFit: "cover" }}
            src={
              service?.img ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw3OdJ3nAPLc94ubUz-4AvNAz_0IzTkNBSqQ&s" // TODO
            }
            alt={service?.name}
          />
        }
      >
        <Link
          to={`/services/${service?._id}`}
          className="font-bold text-xl inline-block mb-2 hover:text-primary-2 truncate w-full hover:text-primary"
        >
          {service?.name}
        </Link>

        <Card.Meta
          title={
            <>
              <div className="flex items-end gap-2">
                <p className="font-semibold text-lg">
                  <span className="!text-primary-2">৳ {service?.price}</span>
                </p>
              </div>
              <p className="text-secondary-200 font-normal">
                Duration: {service?.duration} mins
              </p>
            </>
          }
          description={
            <Typography.Paragraph ellipsis={{ rows: 2 }}>
              {service?.description}
            </Typography.Paragraph>
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
            className="!absolute bottom-2 left-0 right-0 !w-[70%] mx-auto"
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
