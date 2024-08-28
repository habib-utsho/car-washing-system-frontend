import { Empty, Input, Skeleton, Table } from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../types/index.type";
import { useGetMyBookingQuery } from "../../../redux/features/bookingApi";
import moment from "moment";
import { TSlot } from "../../../types/slot.type";

const { Search } = Input;

const Booking = () => {
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

      {isLoadingBooking ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : bookings?.meta?.total === 0 ? (
        <Empty description="No bookings found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={bookings?.data}
          loading={isLoadingBooking || isFetchingBooking}
          rowKey={(record) => record._id}
          pagination={{
            position: ["bottomCenter"],
            current: pagination.page,
            pageSize: pagination.limit,
            total: bookings?.meta?.total,
            onChange: (page, pageSize) =>
              setPagination({ limit: pageSize, page }),
          }}
          scroll={{ x: 1000 }}
        />
      )}
    </div>
  );
};

export default Booking;
