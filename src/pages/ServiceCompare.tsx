import React, { useState } from "react";
import {
  Select,
  Card,
  Row,
  Col,
  Avatar,
  Skeleton,
  Divider,
  Empty,
  Switch,
  Image,
  Modal,
  Button,
} from "antd";
import Container from "../components/ui/Container";
import { useGetAllServicesQuery } from "../redux/features/servicesApi";
import { TService } from "../types/service.type";
import {
  ClockCircleOutlined,
  DollarOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useGetAllBookingQuery } from "../redux/features/bookingApi";
import { useGetAllSlotQuery } from "../redux/features/slotApi";
import { TResponse } from "../types/index.type";
import { TSlot } from "../types/slot.type";
import { TBooking } from "../types/booking.type";

const { Option } = Select;

const ServiceCompare: React.FC = () => {
  const [selectedServiceForModal, setSelectedServiceForModal] =
    useState<TService | null>(null);
  const [selectedService1, setSelectedService1] = useState<TService | null>(
    null
  );
  const [selectedService2, setSelectedService2] = useState<TService | null>(
    null
  );

  const {
    data: bookingRes1,
    isLoading: isLoadingBooking1,
    isFetching: isFetchingBooking1,
  } = useGetAllBookingQuery(
    [{ name: "service", value: selectedService1?._id }],
    {
      skip: !selectedService1,
    }
  );
  const booking1 = bookingRes1 as TResponse<TBooking>;
  const {
    data: bookingRes2,
    isLoading: isLoadingBooking2,
    isFetching: isFetchingBooking2,
  } = useGetAllBookingQuery(
    [{ name: "service", value: selectedService2?._id }],
    {
      skip: !selectedService2,
    }
  );
  const booking2 = bookingRes2 as TResponse<TBooking>;

  const {
    data: slotRes1,
    isLoading: isLoadingSlot1,
    isFetching: isFetchingSlot1,
  } = useGetAllSlotQuery([{ name: "service", value: selectedService1?._id }], {
    skip: !selectedService1,
  });
  const slot1 = slotRes1 as TResponse<TSlot>;
  const {
    data: slotRes2,
    isLoading: isLoadingSlot2,
    isFetching: isFetchingSlot2,
  } = useGetAllSlotQuery([{ name: "service", value: selectedService2?._id }], {
    skip: !selectedService2,
  });
  const slot2 = slotRes2 as TResponse<TSlot>;

  const { data: servicesData, isLoading } = useGetAllServicesQuery([
    { name: "limit", value: 1500 },
    { name: "isDeleted", value: false },
  ]);

  console.log({ booking1, booking2, slot1, slot2 });

  return (
    <div className="py-8 px-2">
      <Container>
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 15 }} />
        ) : (
          <>
            <Row gutter={16}>
              {/* First Dropdown with Search */}
              <Col span={12}>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select a service"
                  optionFilterProp="children"
                  onChange={(value) =>
                    setSelectedService1(
                      servicesData?.data?.find(
                        (service: TService) => service?._id === value
                      ) || null
                    )
                  }
                  filterOption={(input, option) =>
                    // @ts-ignore
                    option?.children?.props?.children[0]?.props?.alt
                      ?.toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  className="!h-auto"
                >
                  {servicesData?.data?.map((service: TService) => (
                    <Option key={service?._id} value={service?._id}>
                      <div className="flex items-center">
                        <Avatar
                          src={service.img}
                          alt={service.name}
                          shape="square"
                          size="small"
                        />
                        <div className="ml-2">
                          <div>{service.name}</div>
                          <div className="text-xs text-gray-500">
                            {service.price} BDT
                          </div>
                        </div>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Col>

              {/* Second Dropdown with Search */}
              <Col span={12}>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select a service"
                  optionFilterProp="children"
                  onChange={(value) =>
                    setSelectedService2(
                      servicesData?.data?.find(
                        (service: TService) => service?._id === value
                      ) || null
                    )
                  }
                  filterOption={(input, option) => {
                    // @ts-ignore
                    return option?.children?.props?.children[0]?.props?.alt
                      ?.toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                  className="!h-auto"
                >
                  {servicesData?.data?.map((service: TService) => (
                    <Option key={service?._id} value={service?._id}>
                      <div className="flex items-center">
                        <Avatar
                          src={service.img}
                          alt={service.name}
                          shape="square"
                          size="small"
                        />
                        <div className="ml-2">
                          <div>{service.name}</div>
                          <div className="text-xs text-gray-500">
                            {service.price} BDT
                          </div>
                        </div>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>

            <Divider />

            {/* Service Comparison */}
            <Row gutter={16} className="mt-8 justify-center">
              <Col span={11}>
                {!selectedService1 ? (
                  <div className="h-[40vh] flex items-center justify-center">
                    <Empty description="Please select service one!" />
                  </div>
                ) : (
                  <Card title={selectedService1?.name} className="my-shadow-1">
                    <div className="space-y-4">
                      <div className=" w-full text-center">
                        <Image
                          src={selectedService1?.img}
                          alt={selectedService1?.name}
                          className="!h-[200px] !w-full mx-auto rounded-md "
                        />
                      </div>

                      {isLoadingBooking1 ||
                      isLoadingSlot1 ||
                      isFetchingBooking1 ||
                      isFetchingSlot1 ? (
                        <div className="flex flex-col gap-[2px]">
                          <Skeleton.Button
                            className="!h-[25px] !w-[275px] "
                            active
                          />
                          <Skeleton.Button
                            className="!h-[25px] !w-[195px] "
                            active
                          />
                        </div>
                      ) : (
                        <div className="!space-y-[4px]">
                          <p className="!my-0">
                            -Total{" "}
                            <strong className="text-primary">
                              {booking1?.meta?.total}
                            </strong>{" "}
                            bookings
                          </p>
                          <p className="!my-0">
                            -Total{" "}
                            <strong className="text-primary">
                              {slot1?.meta?.total}
                            </strong>{" "}
                            slots
                          </p>
                        </div>
                      )}
                      <Divider />
                      <div className="">
                        <div className="flex items-center justify-between gap-2">
                          <p className="!my-0">
                            <DollarOutlined /> {selectedService1?.price} BDT
                          </p>
                          <p className="!my-0">
                            <ClockCircleOutlined /> {selectedService1?.duration}{" "}
                            minutes
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 mt-2">
                          <div>
                            <Switch
                              checked={selectedService1?.isFeatured}
                              disabled
                              size="small"
                              className="bg-green-500"
                            />
                            <span className="text-sm text-gray-600 ml-1">
                              {selectedService1?.isFeatured
                                ? "Featured Service"
                                : "Regular Service"}
                            </span>
                          </div>
                          <Button
                            onClick={() =>
                              setSelectedServiceForModal(selectedService1)
                            }
                            className="cursor-pointer text-primary"
                            icon={<EyeOutlined />}
                          >
                            View Description
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </Col>

              <Col span={1} className="flex justify-center">
                <Divider type="vertical" className="h-full" />
              </Col>

              <Col span={11}>
                {!selectedService2 ? (
                  <div className="h-[40vh] flex items-center justify-center">
                    <Empty description="Please select service two!" />
                  </div>
                ) : (
                  <Card title={selectedService2?.name} className="my-shadow-1">
                    <div className="space-y-4">
                      <div className=" w-full text-center">
                        <Image
                          src={selectedService2?.img}
                          alt={selectedService2?.name}
                          className="!h-[200px] !w-full mx-auto rounded-md "
                        />
                      </div>

                      {isLoadingBooking2 ||
                      isLoadingSlot2 ||
                      isFetchingBooking2 ||
                      isFetchingSlot2 ? (
                        <div className="flex flex-col gap-[2px]">
                          <Skeleton.Button
                            className="!h-[25px] !w-[275px] "
                            active
                          />
                          <Skeleton.Button
                            className="!h-[25px] !w-[195px] "
                            active
                          />
                        </div>
                      ) : (
                        <div className="!space-y-[4px]">
                          <p className="!my-0">
                            -Total{" "}
                            <strong className="text-primary">
                              {booking2?.meta?.total}
                            </strong>{" "}
                            bookings
                          </p>
                          <p className="!my-0">
                            -Total{" "}
                            <strong className="text-primary">
                              {slot2?.meta?.total}
                            </strong>{" "}
                            slots
                          </p>
                        </div>
                      )}
                      <Divider />
                      <div className="">
                        <div className="flex items-center justify-between gap-2">
                          <p className="!my-0">
                            <DollarOutlined /> {selectedService2?.price} BDT
                          </p>
                          <p className="!my-0">
                            <ClockCircleOutlined /> {selectedService2?.duration}{" "}
                            minutes
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 mt-2">
                          <div>
                            <Switch
                              checked={selectedService2?.isFeatured}
                              disabled
                              size="small"
                              className="bg-green-500"
                            />
                            <span className="text-sm text-gray-600 ml-1">
                              {selectedService2?.isFeatured
                                ? "Featured Service"
                                : "Regular Service"}
                            </span>
                          </div>
                          <Button
                            onClick={() =>
                              setSelectedServiceForModal(selectedService2)
                            }
                            className="cursor-pointer text-primary"
                            icon={<EyeOutlined />}
                          >
                            View Description
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </Col>
            </Row>
          </>
        )}
      </Container>

      {/* Description modal */}
      <Modal
        title={`${selectedServiceForModal?.name}'s Description`}
        open={!!selectedServiceForModal}
        onCancel={() => setSelectedServiceForModal(null)}
        footer={null}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: selectedServiceForModal?.description || "",
          }}
        />
      </Modal>
    </div>
  );
};

export default ServiceCompare;
