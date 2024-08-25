import { Button, Empty, message, Popconfirm, Skeleton, Table } from "antd";
import {
  useDeleteAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { TQueryParam, TResponse } from "../../../types/index.type";
import { TAcademicFaculty } from "../../../types/academicFaculty.types";
import AcademicFacultyModal from "../../../components/modal/admin/academicManagement/AcademicFacultyModal";

const AcademicFaculty = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingAcademicFaculty, setEditingAcademicFaculty] =
    useState<Partial<TAcademicFaculty> | null>(null);
  const { data: academicFaculty, isLoading: isLoadingAcademicFaculty } =
    useGetAllAcademicFacultyQuery([
      { name: "limit", value: pagination.limit },
      { name: "page", value: pagination.page },
      ...params,
    ]);
  const [deleteAcademicFaculty] = useDeleteAcademicFacultyMutation();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Students",
      dataIndex: "totalStudent",
    },
    {
      title: "Actions",
      render: (_: TAcademicFaculty, record: TAcademicFaculty) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<EditFilled />}
              onClick={() => {
                setModalVisible(true);
                setEditingAcademicFaculty(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the academic faculty"
              description="Are you sure to delete this academic faculty?"
              onConfirm={() => handleDeleteAcademicFaculty(record._id)}
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

  const handleDeleteAcademicFaculty = async (id: string) => {
    setIsLoadingDeleteId(id);
    try {
      const result = (await deleteAcademicFaculty(
        id
      ).unwrap()) as TResponse<TAcademicFaculty>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to delete academic faculty"
      );
    } finally {
      setIsLoadingDeleteId(null);
    }
  };

  return (
    <div className="">
      <div className="flex gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Academic faculty</h2>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add academic faculty
        </Button>
      </div>

      {isLoadingAcademicFaculty ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : academicFaculty?.meta?.total === 0 ? (
        <Empty description="No academic dept found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={academicFaculty?.data}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          scroll={{ x: 800 }}
        />
      )}

      {/* Create academic faculty modal*/}
      <AcademicFacultyModal
        open={modalVisible}
        setModalVisible={setModalVisible}
        setEditingAcademicFaculty={setEditingAcademicFaculty}
        editingAcademicFaculty={editingAcademicFaculty}
      />
    </div>
  );
};

export default AcademicFaculty;
