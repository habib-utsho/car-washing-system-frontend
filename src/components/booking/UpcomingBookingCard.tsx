import { useState, useEffect } from "react";
import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { TBooking } from "../../types/booking.type";
import moment from "moment";

type TUpcomingBookingCard = {
  booking: TBooking;
};

const UpcomingBookingCard: React.FC<TUpcomingBookingCard> = ({ booking }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const bookingTime = moment(booking?.slot?.date);
      const duration = moment.duration(bookingTime.diff(now));

      if (duration.asSeconds() <= 0) {
        setTimeRemaining("Expired");
        clearInterval(interval);
      } else {
        setTimeRemaining(
          `${Math.floor(
            duration.asDays()
          )}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [booking]);

  return (
    <Card className="min-h-[250px] relative pb-10 space-y-4 my-shadow-1">
      <Link
        to={`/services/${booking?.service?._id}`}
        className="font-bold text-xl inline-block mb-2 hover:text-primary-2 truncate w-full hover:text-primary"
      >
        {booking?.service?.name}
      </Link>

      <Card.Meta
        title={
          <>
            <div className="flex items-end gap-2">
              <p className="font-semibold text-lg">
                <span className="!text-primary-2">
                  ৳ {booking?.service?.price}
                </span>
              </p>
            </div>
            <p className="text-secondary-200 font-normal">
              Duration: {booking?.service?.duration} mins
            </p>
          </>
        }
        description={
          <Typography.Paragraph ellipsis={{ rows: 2 }}>
            {booking?.service?.description}
          </Typography.Paragraph>
        }
      />
      <div className="mt-4">
        <p className="font-medium">
          Vehicle: {booking?.vehicleBrand} {booking?.vehicleModel}
        </p>
        <p className="font-medium">
          Time remaining:{" "}
          <strong className="text-primary">{timeRemaining}</strong>
        </p>
      </div>
    </Card>
  );
};

export default UpcomingBookingCard;
