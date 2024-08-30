import { useParams } from "react-router-dom";
import { useGetSingleSlotQuery } from "../redux/features/slotApi";
import { Button, Card, Form, message, Skeleton, Typography } from "antd";
import { TBooking } from "../types/booking.type";
import Container from "../components/ui/Container";
import { useCreateBookingMutation } from "../redux/features/bookingApi";
import { useAppSelector } from "../redux/hook";
import MyInp from "../components/ui/Form/MyInp";
import moment from "moment";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import convertTwentyFourHourToTwelveHourFormat from "../utils/convertTwentyFourHourToTwelveHourFormat";
import { useInitPaymentMutation } from "../redux/features/paymentApi";

const Booking = () => {
  const { id } = useParams();

  const { data: slot, isLoading } = useGetSingleSlotQuery(id);
  const [initPayment, { isLoading: isLoadingInitPayment }] =
    useInitPaymentMutation();

  const user = useAppSelector((state) => state?.auth?.user);

  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();

  const [form] = Form.useForm();

  const handleSubmit = async (values: TBooking) => {
    try {
      //   const result = (await createBooking({
      //     ...values,
      //     serviceId: slot?.data?.service?._id,
      //     slotId: slot?.data?._id,
      //   }).unwrap()) as TResponse<TBooking>;

      const result = {
        success: true,
        data: [{ _id: 1, service: 5 }],
        message: "hey",
      };
      if (result?.success) {
        message.success(result?.message || "Booking created successfully!");

        const initPaymentResult = await initPayment({
          store_id: "aamarpaytest",
          tran_id: result?.data?._id,
          success_url: "/success",
          fail_url: "/failed",
          cancel_url: "/canceled",
          amount: result?.data?.service?.price,
          currency: "BDT",
          signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
          desc: "Merchant Registration Payment",
          cus_name: user?.name,
          cus_email: user?.email,
          cus_add1: user?.address,
          cus_add2: user?.address,
          cus_city: "Dhaka",
          cus_state: "Dhaka",
          cus_postcode: "1206",
          cus_country: "Bangladesh",
          cus_phone: user?.phone,
          type: "json",
        }).unwrap();
        console.log(initPaymentResult, "initPaymentResult");

        if (initPaymentResult?.result) {
          window.location.href = initPaymentResult?.paymentUrl;
        } else {
          console.log(initPayment, "initPayment");
          message.error("Payment failed.");
        }

        // Redirect to a confirmation page or display a success message
      } else {
        message.error(result?.message || "Booking failed.");
      }
    } catch (error: any) {
      console.log(error, "error");
      message.error(
        error?.message || error?.data?.message || "Booking failed."
      );
    }
  };

  console.log(slot?.data);

  return (
    <div className="my-8">
      <Container>
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 15 }} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <>
              <Card
                title={
                  <h2>
                    Slot Information for{" "}
                    <span className="text-primary">
                      {slot?.data?.service?.name}
                    </span>
                  </h2>
                }
                bordered
                className="my-shadow-1"
              >
                <Typography.Paragraph>
                  <CalendarOutlined className="text-primary mr-2" />{" "}
                  {moment(slot?.data?.date).format("DD MMM YYYY")}
                </Typography.Paragraph>
                <Typography.Paragraph>
                  <ClockCircleOutlined className="text-primary mr-2" />{" "}
                  {convertTwentyFourHourToTwelveHourFormat(
                    slot?.data?.startTime
                  )}{" "}
                  -{" "}
                  {convertTwentyFourHourToTwelveHourFormat(slot?.data?.endTime)}
                </Typography.Paragraph>
                <Typography.Paragraph>
                  <DollarCircleOutlined className="text-primary mr-2" />{" "}
                  {slot?.data?.service?.price} BDT
                </Typography.Paragraph>
                <Typography.Paragraph>
                  <ClockCircleOutlined className="text-primary mr-2" />{" "}
                  {slot?.data?.service?.duration} minutes
                </Typography.Paragraph>
                <Typography.Paragraph>
                  {slot?.data?.service?.description}
                </Typography.Paragraph>
                {/* Add more details about the service and time slot here */}
              </Card>
              <Card
                title="Booking Information"
                bordered
                className="my-shadow-1"
              >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                  <MyInp
                    label="Name"
                    type="text"
                    name="name"
                    defaultValue={user?.name}
                    disabled
                  />
                  <MyInp
                    label="Email"
                    type="text"
                    name="email"
                    defaultValue={user?.email}
                    disabled
                  />
                  <MyInp
                    label="Time slot"
                    type="text"
                    name="timeSlot"
                    defaultValue={`${convertTwentyFourHourToTwelveHourFormat(
                      slot?.data?.startTime
                    )} - ${convertTwentyFourHourToTwelveHourFormat(
                      slot?.data?.endTime
                    )}`}
                    disabled
                  />
                  <MyInp
                    label="Vehicle Type"
                    type="select"
                    name="vehicleType"
                    placeholder="Enter vehicle type"
                    options={[
                      { label: "Car", value: "car" },
                      { label: "Truck", value: "truck" },
                      { label: "SUV", value: "SUV" },
                      { label: "Van", value: "van" },
                      { label: "Motorcycle", value: "motorcycle" },
                      { label: "Bus", value: "bus" },
                      { label: "Electric Vehicle", value: "electricVehicle" },
                      { label: "Hybrid Vehicle", value: "hybridVehicle" },
                      { label: "Bicycle", value: "bicycle" },
                      { label: "Tractor", value: "tractor" },
                    ]}
                  />
                  <MyInp
                    label="Vehicle Brand"
                    type="text"
                    name="vehicleBrand"
                    placeholder="Enter vehicle brand"
                  />
                  <MyInp
                    label="Vehicle Model"
                    type="text"
                    name="vehicleModel"
                    placeholder="Enter vehicle model"
                  />
                  <MyInp
                    label="Manufacturing Year"
                    type="number"
                    name="manufacturingYear"
                    placeholder="Enter manufacturing year"
                  />
                  <MyInp
                    label="Registration Plate"
                    type="text"
                    name="registrationPlate"
                    placeholder="Enter registration plate"
                  />

                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isBookingLoading || isLoadingInitPayment}
                    block
                  >
                    Pay Now
                  </Button>
                </Form>
              </Card>
            </>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Booking;
