import {  Pagination, Skeleton, Empty } from "antd";
import ServiceCard from "../components/services/ServicesCard";
import { TService } from "../types/service.type";
import Container from "../components/ui/Container";
import { useGetAllServicesQuery } from "../redux/features/servicesApi";
import { useState } from "react";

const Services = () => {
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 10 }
  );

  const { data: servicesData, isLoading: isLoadingServices } =
    useGetAllServicesQuery([
      { name: "page", value: pagination.page },
      { name: "limit", value: pagination.limit },
    ]);

  console.log(servicesData, "servicesData");

  return (
    <div>
      <Container className="my-10">
        {isLoadingServices ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton.Button active className="!h-[250px] !w-full" />
            <Skeleton.Button active className="!h-[250px] !w-full" />
            <Skeleton.Button active className="!h-[250px] !w-full" />
          </div>
        ) : servicesData?.meta?.total === 0 ? (
          <Empty />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesData?.data?.map((service: TService) => (
                <ServiceCard service={service} />
              ))}
            </div>

            <div className="text-center">
              {/* pagination={{
            total: orderData?.meta?.total,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }} */}
              <Pagination
                // current={currentPage}
                // pageSize={pageSize}
                total={servicesData?.meta?.total}
                // onChange: (page, pageSize) => {
                //   setPagination({ page, limit: pageSize })
                // }
                onChange={(page, pageSize) =>
                  setPagination({ page, limit: pageSize })
                }
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
