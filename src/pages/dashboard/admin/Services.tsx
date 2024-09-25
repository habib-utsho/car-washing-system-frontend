import {
  Button,
  Empty,
  Input,
  message,
  Popconfirm,
  Skeleton,
  Switch,
  Table,
} from "antd";

import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { TQueryParam, TResponse } from "../../../types/index.type";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
} from "../../../redux/features/servicesApi";
import { TService } from "../../../types/service.type";
import ServicesModal from "../../../components/modal/admin/ServicesModal";

const { Search } = Input;

const Services = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  // @ts-ignore
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingService, setEditingService] =
    useState<Partial<TService> | null>(null);
  const {
    data: services,
    isLoading: isLoadingServices,
    isFetching: isFetchingServices,
  } = useGetAllServicesQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),

    ...params,
  ]);
  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );
  const [isLoadingToggleId, setIsLoadingToggleId] = useState<string | null>(
    null
  );

  const columns = [
    {
      title: "Service",
      render: (record: TService) => {
        return (
          <div className="flex items-center gap-2">
            <img
              src={record?.img}
              alt={record?.name}
              className="h-[40px] w-[40px]"
            />
            {record?.name}
          </div>
        );
      },
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
      title: "Is featured",
      render: (record: TService) => {
        return (
          <Switch
            checked={record?.isFeatured}
            onChange={() => toggleIsFeatured(record)}
            loading={record?._id === isLoadingToggleId}
          />
        );
      },
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

  const toggleIsFeatured = async (payload: TService) => {
    setIsLoadingToggleId(payload?._id);
    try {
      const result = (await updateService({
        _id: payload?._id,
        isFeatured: !payload?.isFeatured,
      }).unwrap()) as TResponse<TService>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to toggle isFeatured service!"
      );
    } finally {
      setIsLoadingToggleId(null);
    }
  };

  return (
    <div className="">
      <div className="flex gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Services</h2>

        <Search
          placeholder="Search service"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
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
        <div className="h-[60vh] flex items-center justify-center">
          <Empty description="No services found!" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={services?.data}
          loading={isLoadingServices || isFetchingServices}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          scroll={{ x: 800 }}
          pagination={{
            position: ["bottomCenter"],
            total: services?.meta?.total,
            current: pagination.page,
            pageSize: pagination.limit,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}

      {/* Create services modal*/}
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
