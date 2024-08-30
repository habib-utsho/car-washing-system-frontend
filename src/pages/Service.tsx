import { Link, useParams } from "react-router-dom";
import { useGetSingleServiceQuery } from "../redux/features/servicesApi";
import Container from "../components/ui/Container";
import {
  Skeleton,
  Card,
  Typography,
  Button,
  Breadcrumb,
  Collapse,
  CollapseProps,
  Timeline,
  Empty,
} from "antd";
import banner from "../assets/img/serviceDetailsBanner.jpg";
import {
  CheckCircleFilled,
  PlusCircleOutlined,
  PlusOutlined,
  SafetyCertificateFilled,
} from "@ant-design/icons";
import MyMotion from "../components/helpingCompo/MyMotion";
import { useGetAllSlotQuery } from "../redux/features/slotApi";
import { useState } from "react";
import moment from "moment";
import { TSlot } from "../types/slot.type";
import convertTwentyFourHourToTwelveHourFormat from "../utils/convertTwentyFourHourToTwelveHourFormat";

const { Title, Paragraph } = Typography;

const Service = () => {
  const { id } = useParams();
  const { data: serviceData, isLoading: isLoadingService } =
    useGetSingleServiceQuery(id);
  const { data: slots, isLoading: isLoadingSlots } = useGetAllSlotQuery([
    { name: "service", value: id },
  ]);
  const { name, duration, price, description, img } = serviceData?.data || {};

  const accordionItems: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <span className="text-lg font-semibold">
          What is included in the service?
        </span>
      ),
      children: (
        <p>
          Our service includes a comprehensive wash, vacuuming, and polishing of
          your vehicle.
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <span className="text-lg font-semibold">
          How long does the service take?
        </span>
      ),
      children: (
        <p>
          The service typically takes around{" "}
          <span className="text-primary font-bold">{duration}</span> minutes,
          depending on the condition of your vehicle.
        </p>
      ),
    },
    {
      key: "3",
      label: (
        <span className="text-lg font-semibold">
          What is the cost of the service?
        </span>
      ),
      children: (
        <p>
          The cost of the service is{" "}
          <span className="text-primary font-bold">{price}</span> BDT.
        </p>
      ),
    },
    {
      key: "4",
      label: (
        <span className="text-lg font-semibold">How can I book a service?</span>
      ),
      children: (
        <p>
          You can easily book the service online through our website or contact
          us directly via phone.
        </p>
      ),
    },
    {
      key: "5",
      label: (
        <span className="text-lg font-semibold">
          Do you offer any discounts?
        </span>
      ),
      children: (
        <p>
          We offer seasonal discounts and promotions. Keep an eye on our website
          or subscribe to our newsletter for updates.
        </p>
      ),
    },
  ];
  const timelineItems = [
    {
      children: (
        <>
          <h2 className="font-semibold text-lg">Select service</h2>
          <p>From the services page, select the service you are looking for.</p>
        </>
      ),
    },
    {
      children: (
        <>
          <h2 className="font-semibold text-lg">Book your schedule</h2>
          <p>Select your convenient time slot.</p>
        </>
      ),
    },
    {
      dot: <CheckCircleFilled />,
      color: "green",
      children: (
        <>
          <h2 className="font-semibold text-lg">Place order</h2>
          <p>Confirm your order by clicking ‘Place order’.</p>
        </>
      ),
    },
  ];

  const [selectedSlot, setSelectedSlot] = useState<TSlot | null>(null);

  // Function to group slots by date
  const groupSlotsByDate = (slots: TSlot[]) => {
    if (!slots || slots?.length === 0) return {};
    return slots?.reduce((groups, slot) => {
      const date = moment(slot.date).format("YYYY-MM-DD");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(slot);
      return groups;
    }, {});
  };

  const groupedSlots = groupSlotsByDate(slots?.data || []);

  const handleSlotClick = (slot: TSlot) => {
    if (slot.isBooked !== "available") return;
    setSelectedSlot(slot);
  };

  return (
    <div className="bg-slate-50">
      {/* Banner */}
      <div
        className="mb-8 w-full h-[450px] bg-slate-800 bg-blend-overlay bg-no-repeat bg-center bg-cover p-4 py-8 text-white"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <Container className="space-y-4">
          {isLoadingService ? (
            <Skeleton paragraph={{ rows: 5 }} active />
          ) : (
            <MyMotion scale={1.4}>
              <div className="flex justify-between gap-4 items-center">
                <div>
                  {" "}
                  <Breadcrumb
                    items={[
                      {
                        title: (
                          <Link to="/" className="!text-gray">
                            Home
                          </Link>
                        ),
                      },
                      {
                        title: (
                          <Link to="/services" className="!text-gray">
                            Services
                          </Link>
                        ),
                      },
                      {
                        title: <span className="text-white">{name}</span>,
                      },
                    ]}
                    className="text-gray"
                  />
                  <h2 className="!text-white font-semibold text-3xl md:text-4xl my-2">
                    Overview of <span className="text-primary">{name}</span>
                  </h2>
                  <p className="flex gap-2 items-center my-4">
                    <span className="h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center ">
                      <SafetyCertificateFilled />
                    </span>{" "}
                    Safely wash
                  </p>
                  <ul className="text-gray space-y-2 mt-6 mb-3">
                    {[
                      "Fast service",
                      "Quality service",
                      "Professional service",
                      "Affordable price",
                      "Experienced staff",
                      "Eco-friendly products",
                    ].map((item) => {
                      return (
                        <li className="flex gap-2 items-center">
                          <span className="h-7 w-7 rounded-full bg-success text-white flex items-center justify-center ">
                            <CheckCircleFilled />
                          </span>{" "}
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <Button
                  type="primary"
                  onClick={() => {
                    const viewSlotsElement =
                      document.getElementById("view-slots");
                    if (viewSlotsElement) {
                      viewSlotsElement.scrollIntoView({
                        behavior: "smooth",
                      });
                    }
                  }}
                  size="large"
                >
                  Upcoming Slots
                </Button>
              </div>
            </MyMotion>
          )}
        </Container>
      </div>

      <Container>
        {isLoadingService || isLoadingSlots ? (
          <Skeleton active paragraph={{ rows: 15 }} />
        ) : (
          <div>
            <Card
              cover={
                <img
                  alt={name}
                  src={
                    img ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw3OdJ3nAPLc94ubUz-4AvNAz_0IzTkNBSqQ&s"
                  }
                  className="w-full h-[200px]"
                />
              }
              className="rounded-md my-shadow-1 w-3/6 mx-auto mb-6"
            >
              <Title level={2}>
                <span className="text-primary">{name}</span>
              </Title>
              <Paragraph strong>{`Duration: ${duration} mins`}</Paragraph>
              <Paragraph strong>{`Price: ${price} BDT`}</Paragraph>
              <p className="text-normal-desc">{description}</p>
            </Card>

            {/* FAQ */}
            <MyMotion y={50}>
              <div className="my-4 space-y-5">
                <h2 className="font-semibold text-2xl">
                  Frequently asked question
                </h2>
                <Collapse
                  accordion
                  items={accordionItems}
                  expandIcon={({ isActive }) => (
                    <PlusOutlined rotate={isActive ? 45 : 0} />
                  )}
                  className="site-collapse-custom-collapse"
                  expandIconPosition="end"
                />
              </div>
            </MyMotion>

            <div id="view-slots">
              {/* Timeline */}
              <MyMotion y={-50}>
                <div className="my-[60px] space-y-5">
                  <h2 className="font-semibold text-2xl">How to book</h2>

                  <Timeline items={timelineItems} />
                </div>
              </MyMotion>

              {/* Upcoming Slots */}
              <MyMotion y={50}>
                {/* Upcoming Slots Section-wise by Date */}
                <div className="my-8 space-y-5 bg-white rounded-md my-shadow-1 p-4">
                  <h2 className="font-semibold text-2xl">Upcoming Slots</h2>

                  {Object.keys(groupedSlots)?.length === 0 ? (
                    <Empty description="No upcoming time slots for this service." />
                  ) : (
                    Object.keys(groupedSlots)?.map((date) => (
                      <div key={date} className="my-6">
                        <h3 className="text-xl font-semibold mb-4">
                          {moment(date).format("DD MMM YYYY")}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {groupedSlots[date].map((slot: TSlot) => (
                            <Button
                              key={slot._id}
                              disabled={slot.isBooked !== "available"}
                              type={
                                selectedSlot?._id === slot._id
                                  ? "primary"
                                  : slot.isBooked === "available"
                                  ? "default"
                                  : "default"
                              }
                              onClick={() => handleSlotClick(slot)}
                              className=""
                            >
                              {convertTwentyFourHourToTwelveHourFormat(
                                slot.startTime
                              )}{" "}
                              -{" "}
                              {convertTwentyFourHourToTwelveHourFormat(
                                slot.endTime
                              )}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))
                  )}

                  {selectedSlot && (
                    <Link
                      to={`/booking/${selectedSlot._id}`}
                      className="block text-center"
                    >
                      <Button
                        type="primary"
                        size="large"
                        className="mt-4 w-[250px]"
                        icon={<PlusCircleOutlined />}
                      >
                        Book Now
                      </Button>
                    </Link>
                  )}
                </div>
              </MyMotion>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Service;
