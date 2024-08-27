import { Button, Empty, message, Popconfirm, Skeleton, Table } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { useGetAllBookingQuery } from "../../../../redux/features/bookingApi";
import moment from "moment";
import { TBooking } from "../../../../types/booking.type";
import { TSlot } from "../../../../types/slot.type";

const Booking = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingBooking, setEditingBooking] =
    useState<Partial<TBooking> | null>(null);
  const { data: bookings, isLoading: isLoadingBooking } = useGetAllBookingQuery(
    [
      { name: "limit", value: pagination.limit },
      { name: "page", value: pagination.page },
      ...params,
    ]
  );

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
          rowKey={(record) => record._id}
          pagination={{
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
