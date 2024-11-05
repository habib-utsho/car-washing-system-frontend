import { useState } from "react";
import { Button, Input, message, Popconfirm, Table, TableProps } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useDebounce from "../../../../hooks/useDebounce";
import {
  useDeleteNoticeMutation,
  useGetAllNoticeQuery,
} from "../../../../redux/features/noticeApi.js";
import firstLetterToCapital from "../../../../utils/firstLetterToCapital.js";
import NoticeModal from "../../../../components/modal/admin/NoticeModal.js";
import { TNotice } from "../../../../types/notice.type.js";
import NoticeDetailsModal from "../../../../components/modal/admin/NoticeDetailsModal.js";

const { Search } = Input;

const Notice = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm, 500);

  const [selectedNotice, setSelectedNotice] = useState<TNotice | null>(null);

  const [isNoticeModalVisible, setIsNoticeModalVisible] = useState(false);
  const [deleteNotice] = useDeleteNoticeMutation();

  const [editingNotice, setEditingNotice] = useState<TNotice | null>(null);

  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    {
      page: 1,
      limit: 10,
    }
  );
  const {
    data: notices,
    isLoading: isLoadingNotices,
    isFetching: isFetchingNotices,
  } = useGetAllNoticeQuery([
    { name: "page", value: pagination.page },
    { name: "limit", value: pagination.limit },
    ...(debounceSearch ? [{ name: "searchTerm", value: debounceSearch }] : []),
  ]);

  const columns: TableProps<TNotice>["columns"] = [
    {
      key: "index",
      title: "#",
      render: (_, __, index) => index + 1,
    },
    {
      key: "name",
      title: "Notice Name",
      dataIndex: "name",
      render: (name) => <h2>{name}</h2>,
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (status: "active" | "inactive") => {
        const statusColors = {
          active: "text-green-500 bg-green-500/10",
          inactive: "text-red-500 bg-red-500/10",
        };
        return (
          <span
            className={`${statusColors[status]} rounded py-1 px-3 font-semibold`}
          >
            {firstLetterToCapital(status)}
          </span>
        );
      },
    },
    {
      key: "priority",
      title: "Priority",
      dataIndex: "priority",
      render: (priority: "high" | "medium" | "low") => {
        const priorityColors = {
          high: "text-red-500",
          medium: "text-yellow-500",
          low: "text-green-500",
        };
        return (
          <span className={`${priorityColors[priority]} font-semibold`}>
            {firstLetterToCapital(priority)}
          </span>
        );
      },
    },
    {
      key: "action",
      title: "Action",
      render: (record) => (
        <div className="inline-flex items-center rounded-md bg-slate-50 border border-gray">
          <span
            className="text-xl border-r border-gray py-1 cursor-pointer px-2"
            onClick={(e) => {
              e.stopPropagation();
              setEditingNotice(record);
            }}
          >
            <EditOutlined />
          </span>
          <Popconfirm
            title="Delete the notice"
            description="Are you sure to delete this notice?"
            onConfirm={(e) => {
              e?.stopPropagation();
              deleteNoticeHandler(record?._id);
            }}
            // @ts-ignore
            onClick={(e) => e?.stopPropagation()}
            onCancel={(e) => e?.stopPropagation()}
            okText="Yes"
            cancelText="No"
          >
            <span className="text-xl text-danger py-1 px-2 cursor-pointer">
              <DeleteOutlined />
            </span>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const deleteNoticeHandler = async (id: string) => {
    try {
      const res = await deleteNotice(id).unwrap();
      message.success(res.message || "Notice deleted successfully!");
    } catch (error: any) {
      message.error(
        error?.data?.message || error?.message || "An error occurred"
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Notices</h1>
      {/* Searching area */}
      <div className="flex gap-4 justify-between mb-8 flex-wrap">
        <Search
          placeholder="Search notice"
          onChange={(e) => setSearchTerm(e.target.value)}
          size="middle"
          allowClear
          enterButton
          className="max-w-[200px] lg:max-w-[250px]"
        />
        <Button type="primary" onClick={() => setIsNoticeModalVisible(true)}>
          Add Notice
        </Button>
      </div>

      <Table
        columns={columns}
        loading={isLoadingNotices || isFetchingNotices}
        dataSource={notices?.data}
        rowKey="id"
        rowClassName={() => `cursor-pointer`}
        onRow={(record) => ({
          onClick: () => setSelectedNotice(record),
        })}
        scroll={{ x: 800 }}
        pagination={{
          position: ["bottomCenter"],
          total: notices?.meta?.total,
          current: pagination.page,
          pageSize: pagination.limit,
          onChange: (page, pageSize) => {
            setPagination({ page, limit: pageSize });
          },
        }}
      />

      {/* Add notice */}
      <NoticeModal
        isModalVisible={isNoticeModalVisible}
        setIsModalVisible={setIsNoticeModalVisible}
        editingNotice={editingNotice}
        setEditingNotice={setEditingNotice}
      />
      {/* Details notice */}
      <NoticeDetailsModal
        selectedNotice={selectedNotice}
        setSelectedNotice={setSelectedNotice}
      />
    </div>
  );
};

export default Notice;
