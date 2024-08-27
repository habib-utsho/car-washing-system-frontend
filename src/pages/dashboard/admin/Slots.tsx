import { Button, Empty, message, Select, Skeleton, Table } from "antd";
import { useState } from "react";
import moment from "moment";
import { TQueryParam } from "../../../types/index.type";
import {
  useGetAllSlotQuery,
  useToggleStatusMutation,
} from "../../../redux/features/slotApi";
import { TSlot } from "../../../types/slot.type";
import { TService } from "../../../types/service.type";
import SlotModal from "../../../components/modal/admin/SlotModal";

const Slots = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {
    data: slots,
    isLoading: isLoadingSlot,
    isFetching: isFetchingSlots,
  } = useGetAllSlotQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...params,
  ]);
  const [toggleSlotStatus] = useToggleStatusMutation();

  const columns = [
    {
      title: "Service name",
      dataIndex: "service",
      key: "service name",
      render: (service: TService) => service?.name || "N/A",
    },
    {
      title: "Price",
      dataIndex: "service",
      key: "service price",
      render: (service: TService) => service?.price || "N/A",
    },
    {
      title: "Duration",
      dataIndex: "service",
      key: "service duration",
      render: (service: TService) => service?.duration || "N/A",
    },
    {
      title: "Status",
      key: "isBooked",
      dataIndex: "isBooked",
      render: (isBooked: string) => {
        return (
          <div
            className={`${
              isBooked === "booked"
                ? "text-yellow-500"
                : isBooked === "available"
                ? "text-success"
                : isBooked === "canceled"
                ? "text-danger"
                : "text-gray"
            }`}
          >
            {isBooked}
          </div>
        );
      },
    },
    {
      title: "Slot",
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
      title: "Actions",
      render: (_: TService, record: TSlot) => {
        return (
          <Select
            className="w-[200px]"
            defaultValue={record.isBooked}
            disabled={record.isBooked === "booked"}
            size="large"
            placeholder="Change status"
            onChange={() => handleToggleStatus(record._id)}
            options={[
              { label: "Available", value: "available" },
              { label: "Canceled", value: "canceled" },
            ]}
          />
        );
      },
    },
  ];

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await toggleSlotStatus(id).unwrap();
      if (res.success) {
        message.success(res.message);
      } else {
        message.error(res.message);
      }
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to change status"
      );
    }
  };

  return (
    <div className="">
      <div className="flex gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Slots</h2>

        <Select
          className="w-[250px]"
          size="large"
          placeholder="Filter by status"
          onChange={(value) =>
            setParams([...params, { name: "isBooked", value }])
          }
          options={[
            { label: "Available", value: "available" },
            { label: "Booked", value: "booked" },
            { label: "Canceled", value: "canceled" },
          ]}
        />

        <Button type="primary" onClick={() => setModalVisible(true)}>
          Create slot
        </Button>
      </div>

      {isLoadingSlot ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : slots?.meta?.total === 0 ? (
        <Empty description="No slots found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={slots?.data}
          loading={isLoadingSlot || isFetchingSlots}
          rowKey={(record) => record._id}
          pagination={{
            position: ["bottomCenter"],
            current: pagination.page,
            pageSize: pagination.limit,
            total: slots?.meta?.total,
            onChange: (page, pageSize) =>
              setPagination({ limit: pageSize, page }),
          }}
          scroll={{ x: 1000 }}
        />
      )}

      {/* Create slot  modal*/}
      <SlotModal open={modalVisible} setModalVisible={setModalVisible} />
    </div>
  );
};

export default Slots;
