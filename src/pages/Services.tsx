import { Row, Col, Pagination, Spin, Skeleton } from "antd";
import { useState } from "react";
import ServiceCard from "../components/services/ServicesCard";
import { TService } from "../types/service.type";
import Container from "../components/ui/Container";

const Services = () => {
  const { data: products, isLoading } = {
    isLoading: false,
    data: {
      meta: {
        total: 5,
      },
      data: [
        {
          _id: "001",
          name: "Basic Wash",
          description: "A quick exterior wash to make your car shine.",
          price: 1000,
          duration: 20,
          isDeleted: false,
          createdAt: "2024-07-01T08:00:00.000Z",
          updatedAt: "2024-07-01T08:00:00.000Z",
          __v: 0,
        },
        {
          _id: "002",
          name: "Deluxe Wash",
          description: "Includes an exterior wash with a protective wax coat.",
          price: 2000,
          duration: 45,
          isDeleted: false,
          createdAt: "2024-07-02T08:00:00.000Z",
          updatedAt: "2024-07-02T08:00:00.000Z",
          __v: 0,
        },
        {
          _id: "003",
          name: "Interior Detailing",
          description: "Complete interior vacuum and detailing service.",
          price: 3000,
          duration: 60,
          isDeleted: false,
          createdAt: "2024-07-03T08:00:00.000Z",
          updatedAt: "2024-07-03T08:00:00.000Z",
          __v: 0,
        },
        {
          _id: "004",
          name: "Full Service Wash",
          description: "Complete exterior wash and interior detailing.",
          price: 5000,
          duration: 90,
          isDeleted: false,
          createdAt: "2024-07-04T08:00:00.000Z",
          updatedAt: "2024-07-04T08:00:00.000Z",
          __v: 0,
        },
        {
          _id: "005",
          name: "Eco Wash",
          description: "Eco-friendly wash using biodegradable products.",
          price: 2500,
          duration: 40,
          isDeleted: false,
          createdAt: "2024-07-05T08:00:00.000Z",
          updatedAt: "2024-07-05T08:00:00.000Z",
          __v: 0,
        },
      ],
    },
  };

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Container className="my-10">
        {isLoading ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {products?.data?.map((service: TService) => (
                <Col xs={24} sm={12} md={8} lg={6} key={service._id}>
                  <ServiceCard service={service} />
                </Col>
              ))}
            </Row>

            <div className="text-center">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={products.meta.total}
                onChange={onChangePage}
                style={{ textAlign: "center", marginTop: "20px" }}
                className="bg-primary-50 rounded-md p-4 inline-flex"
              />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Services;
