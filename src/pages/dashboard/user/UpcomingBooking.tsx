import { Empty, Input, Pagination, Skeleton, Table } from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../types/index.type";
import { useGetMyBookingQuery } from "../../../redux/features/bookingApi";
import moment from "moment";
import { TSlot } from "../../../types/slot.type";
import { TBooking } from "../../../types/booking.type";
import UpcomingBookingCard from "../../../components/booking/UpcomingBookingCard";

const { Search } = Input;

const UpcomingBooking = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [params, setParams] = useState<TQueryParam[]>([]);
  const {
    data: bookings,
    isLoading: isLoadingBooking,
    isFetching: isFetchingBooking,
  } = useGetMyBookingQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    { name: "upcoming", value: true },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
    ...params,
  ]);

  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (text, record) => record.customer?.name || "N/A",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (text, record) => record.service?.name || "N/A",
    },
    {
      title: "Slot",
      dataIndex: "slot",
      key: "slot",
      render: (slot: TSlot) => {
        const formatTime = (time: string) =>
          moment(time, "HH:mm").format("h:mm A");

        return (
          <div>
            <div className="text-sm font-semibold text-gray-700">
              {`${formatTime(slot?.startTime)} - ${formatTime(slot?.endTime)}`}
            </div>
            <div className="text-xs text-gray-700">
              {moment(slot?.date).format("DD MMM, YYYY")}
            </div>
          </div>
        );
      },
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
    },
    {
      title: "Vehicle Brand",
      dataIndex: "vehicleBrand",
      key: "vehicleBrand",
    },
    {
      title: "Vehicle Model",
      dataIndex: "vehicleModel",
      key: "vehicleModel",
    },
    {
      title: "Manufacturing Year",
      dataIndex: "manufacturingYear",
      key: "manufacturingYear",
    },
    {
      title: "Registration Plate",
      dataIndex: "registrationPlate",
      key: "registrationPlate",
    },
  ];

  return (
    <div className="">
      <div className="flex gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Bookings</h2>

        <Search
          placeholder="Search by vehicle model, brand and type"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
      </div>

      {isLoadingBooking || isFetchingBooking ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton.Button active className="!h-[250px] !w-full" />
          <Skeleton.Button active className="!h-[250px] !w-full" />
          <Skeleton.Button active className="!h-[250px] !w-full" />
        </div>
      ) : bookings?.meta?.total === 0 ? (
        <div className="h-[75vh] flex items-center justify-center">
          <Empty description={"No upcoming booking!"} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings?.data?.map((booking: TBooking) => (
              <UpcomingBookingCard booking={booking} />
            ))}
          </div>

          <div className="rounded-md p-4 bg-primary bg-opacity-5 my-10 flex justify-center">
            <Pagination
              current={pagination.page}
              pageSize={pagination.limit}
              total={bookings?.meta?.total}
              onChange={(page, pageSize) =>
                setPagination({ page, limit: pageSize })
              }
              className=""
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UpcomingBooking;
