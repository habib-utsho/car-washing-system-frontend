import { Pagination, Skeleton, Empty, Select, Input, Button } from "antd";
import ServiceCard from "../components/services/ServicesCard";
import { TService } from "../types/service.type";
import Container from "../components/ui/Container";
import { useGetAllServicesQuery } from "../redux/features/servicesApi";
import { useState } from "react";
import { TQueryParam } from "../types/index.type";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const Services = () => {
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 10 }
  );
  const [isSort, setIsSort] = useState<string | null>(null);

  // @ts-ignore
  const [params, setParams] = useState<TQueryParam[]>([]);

  const {
    data: servicesData,
    isLoading: isLoadingServices,
    isFetching,
  } = useGetAllServicesQuery([
    { name: "page", value: pagination.page },
    { name: "limit", value: pagination.limit },
    { name: "isDeleted", value: false },
    ...(priceRange ? [{ name: "priceRange", value: priceRange }] : []),
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
    ...(isSort ? [{ name: "sort", value: isSort }] : []),
    ...params,
  ]);

  return (
    <div>
      <Container className="my-10">
        {isLoadingServices || isFetching ? (
          <div className="">
            <Skeleton.Button
              active
              className="!h-[40px] !w-[320px] md:!w-[550px] xl:!w-[600px] !mb-8"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              <Skeleton.Button active className="!h-[250px] !w-full" />
              <Skeleton.Button active className="!h-[250px] !w-full" />
              <Skeleton.Button active className="!h-[250px] !w-full" />
              <Skeleton.Button active className="!h-[250px] !w-full" />
              <Skeleton.Button active className="!h-[250px] !w-full" />
              <Skeleton.Button active className="!h-[250px] !w-full" />
              <Skeleton.Button active className="!h-[250px] !w-full" />
              <Skeleton.Button active className="!h-[250px] !w-full" />
              <Skeleton.Button active className="!h-[250px] !w-full" />
              <Skeleton.Button active className="!h-[250px] !w-full" />
            </div>
          </div>
        ) : servicesData?.meta?.total === 0 ? (
          <div className="h-[75vh] flex items-center justify-center">
            <Empty />
          </div>
        ) : (
          <>
            {/* Filtering and sorting */}
            <div className="mb-8 flex gap-4 flex-wrap">
              {/* Price range */}
              <Select
                className="w-[200px]"
                onChange={(value) => {
                  // const newParams = params.filter(
                  //   (param) => param.name !== "priceRange"
                  // );
                  // setParams([...newParams, { name: "priceRange", value }]);
                  setPriceRange(value);
                }}
                value={priceRange}
                options={[
                  { min: 0, max: 500 },
                  { min: 500, max: 1000 },
                  { min: 1000, max: 2000 },
                  { min: 2000, max: 4000 },
                  { min: 4000, max: 8000 },
                  { min: "All price", max: "All price" },
                ].map((item) => {
                  if (item.min === "All price") {
                    return {
                      label: item.min,
                      value: null,
                    };
                  }
                  return {
                    label: `${item.min} - ${item.max}`,
                    value: `${item.min},${item.max}`,
                  };
                })}
                placeholder="Filter by price range"
                // style={{ width: "100%" }}
              />
              {/* Search */}
              <Search
                placeholder="Search service"
                onSearch={(value) => setSearchTerm(value)}
                allowClear
                enterButton
                className="w-[200px] "
              />

              <div className="flex items-center gap-2">
                <span className="text-normal-desc pr-1 border-r border-r-slate-200">
                  Sort by
                </span>
                <Button
                  onClick={() =>
                    setIsSort(isSort === "price" ? "-price" : "price")
                  }
                >
                  {isSort === "-price" ? (
                    <SortAscendingOutlined />
                  ) : (
                    isSort === "price" && <SortDescendingOutlined />
                  )}{" "}
                  Price
                </Button>
                <Button
                  onClick={() =>
                    setIsSort(isSort === "duration" ? "-duration" : "duration")
                  }
                >
                  {isSort === "-duration" ? (
                    <SortAscendingOutlined />
                  ) : (
                    isSort === "duration" && <SortDescendingOutlined />
                  )}{" "}
                  Duration
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {servicesData?.data?.map((service: TService) => (
                <ServiceCard service={service} />
              ))}
            </div>

            <div className="rounded-md p-4 bg-primary bg-opacity-5 my-10 flex justify-center">
              <Pagination
                current={pagination.page}
                pageSize={pagination.limit}
                total={servicesData?.meta?.total}
                onChange={(page, pageSize) =>
                  setPagination({ page, limit: pageSize })
                }
                className=""
              />
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Services;
