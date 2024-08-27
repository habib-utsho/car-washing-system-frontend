import {
  Button,
  Empty,
  Input,
  message,
  Popconfirm,
  Skeleton,
  Table,
} from "antd";

import { DeleteFilled } from "@ant-design/icons";
import { useState } from "react";
import {
  TQueryParam,
  TResponse,
  TRole,
  TUser,
} from "../../../../types/index.type";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUserToAdminMutation,
} from "../../../../redux/features/auth/authApi";
import { TBooking } from "../../../../types/booking.type";

const User = () => {
  const { Search } = Input;
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const {
    data: users,
    isLoading: isLoadingUser,
    isFetching,
  } = useGetAllUserQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
    ...params,
  ]);
  const [deleteUser] = useDeleteUserMutation();
  const [makeAdmin] = useUserToAdminMutation();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );
  const [isLoadingMakeAdminId, setIsLoadingMakeAdminId] = useState<
    string | null
  >(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "role",
      dataIndex: "role",
      render: (role: TRole) => (
        <div
          className={`font-semibold ${
            role === "admin" ? "text-primary" : "text-slate-700"
          }`}
        >
          {role}
        </div>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
    },

    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      render: (_: TUser, record: TUser) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              // icon={<Ed />}
              loading={isLoadingMakeAdminId === record._id}
              onClick={() => handleUserToAdmin(record?._id)}
              disabled={record.role === "admin"}
            >
              Make admin
            </Button>
            <Popconfirm
              title="Delete the student"
              description="Are you sure to delete this student?"
              onConfirm={() => handleDeleteUser(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteFilled />}
                loading={isLoadingDeleteId === record._id}
              ></Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDeleteUser = async (id: string) => {
    setIsLoadingDeleteId(id);
    try {
      const result = (await deleteUser(id).unwrap()) as TResponse<TUser>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(e?.data?.message || e?.message || "Failed to delete user");
    } finally {
      setIsLoadingDeleteId(null);
    }
  };

  const handleUserToAdmin = async (id: string) => {
    setIsLoadingMakeAdminId(id);

    try {
      const result = (await makeAdmin(id).unwrap()) as TResponse<TUser>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(e?.data?.message || e?.message || "Failed to make admin");
    } finally {
      setIsLoadingMakeAdminId(null);
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">User</h2>
        <Search
          placeholder="Search student"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
      </div>

      {isLoadingUser ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : users?.meta?.total === 0 ? (
        <Empty description="No user found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={users?.data}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          scroll={{ x: 800 }}
          loading={isLoadingUser || isFetching}
          pagination={{
            total: users?.meta?.total,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}
    </div>
  );
};

export default User;
