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
  Tooltip,
} from "antd";
import Container from "../components/ui/Container";
import { useGetAllServicesQuery } from "../redux/features/servicesApi";
import { TService } from "../types/service.type";

const { Option } = Select;

const ServiceCompare: React.FC = () => {
  const [selectedService1, setSelectedService1] = useState<TService | null>(
    null
  );
  const [selectedService2, setSelectedService2] = useState<TService | null>(
    null
  );

  const { data: servicesData, isLoading } = useGetAllServicesQuery([
    { name: "limit", value: 1500 },
    { name: "isDeleted", value: false },
  ]);

  console.log({ selectedService1, selectedService2 });

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
            <Row gutter={16} className="mt-8">
              <Col span={12}>
                {!selectedService1 ? (
                  <div className="h-[40vh] flex items-center justify-center">
                    <Empty description="Please select service one!" />
                  </div>
                ) : (
                  <Card title={selectedService1?.name} className="my-shadow-1">
                    <div className="space-y-4">
                      <img
                        src={selectedService1?.img}
                        alt={selectedService1?.name}
                        style={{ width: "100%" }}
                        className="h-[200px] rounded-md "
                      />
                      <p>Price: {selectedService1?.price} BDT</p>
                      <p>Duration: {selectedService1?.duration} minutes</p>
                      <p className="flex gap-2 items-center">
                        Featured:
                        <Switch
                          checked={selectedService1?.isFeatured}
                          disabled
                        />
                      </p>
                      <Tooltip title={selectedService1?.description}>
                        <p className="line-clamp-3">
                          {selectedService1?.description}
                        </p>
                      </Tooltip>
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
                      <img
                        src={selectedService2?.img}
                        alt={selectedService2?.name}
                        style={{ width: "100%" }}
                        className="h-[200px] rounded-md "
                      />
                      <p>Price: {selectedService2?.price} BDT</p>
                      <p>Duration: {selectedService2?.duration} minutes</p>
                      <p className="flex gap-2 items-center">
                        Featured:
                        <Switch
                          checked={selectedService2?.isFeatured}
                          disabled
                        />
                      </p>
                      <Tooltip title={selectedService2?.description}>
                        <p className="line-clamp-3">
                          {selectedService2?.description}
                        </p>
                      </Tooltip>
                    </div>
                  </Card>
                )}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default ServiceCompare;
