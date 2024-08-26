import { Button, Empty, message, Popconfirm, Skeleton, Table } from "antd";

import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { TQueryParam, TResponse } from "../../../types/index.type";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "../../../redux/features/servicesApi";
import { TService } from "../../../types/service.type";
import ServicesModal from "../../../components/modal/admin/ServicesModal";

const Services = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingService, setEditingService] =
    useState<Partial<TService> | null>(null);
  const { data: services, isLoading: isLoadingServices } =
    useGetAllServicesQuery([
      { name: "limit", value: pagination.limit },
      { name: "page", value: pagination.page },
      ...params,
    ]);
  const [deleteService] = useDeleteServiceMutation();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Actions",
      render: (_: TService, record: TService) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<EditFilled />}
              onClick={() => {
                setModalVisible(true);
                setEditingService(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the service"
              description="Are you sure to delete this service?"
              onConfirm={() => handleDeleteService(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteFilled />}
                loading={isLoadingDeleteId === record._id}
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDeleteService = async (id: string) => {
    setIsLoadingDeleteId(id);
    try {
      const result = (await deleteService(id).unwrap()) as TResponse<TService>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to delete service!"
      );
    } finally {
      setIsLoadingDeleteId(null);
    }
  };

  return (
    <div className="">
      <div className="flex gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Services</h2>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add service
        </Button>
      </div>

      {isLoadingServices ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : services?.meta?.total === 0 ? (
        <Empty description="No academic dept found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={services?.data}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          scroll={{ x: 800 }}
        />
      )}

      {/* Create academic department modal*/}
      <ServicesModal
        open={modalVisible}
        setModalVisible={setModalVisible}
        setEditingService={setEditingService}
        editingService={editingService}
      />
    </div>
  );
};

export default Services;
