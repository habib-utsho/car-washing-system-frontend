import { Button, Empty, message, Popconfirm, Skeleton, Table } from "antd";

import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useState } from "react";
import { TQueryParam, TResponse } from "../../../types/index.type";
import AcademicDepartmentModal from "../../../components/modal/admin/academicManagement/AcademicDepartmentModal";
import { TAcademicDepartment } from "../../../types/academicDepartment.types";
import { TAcademicFaculty } from "../../../types/academicFaculty.types";
import {
  useDeleteAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery,
} from "../../../redux/features/admin/academicManagementApi";

const AcademicDepartment = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingAcademicDepartment, setEditingAcademicDepartment] =
    useState<Partial<TAcademicDepartment> | null>(null);
  const { data: academicDepartment, isLoading: isLoadingAcademicDepartment } =
    useGetAllAcademicDepartmentQuery([
      { name: "limit", value: pagination.limit },
      { name: "page", value: pagination.page },
      ...params,
    ]);
  const [deleteAcademicDepartment] = useDeleteAcademicDepartmentMutation();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Short name",
      dataIndex: "shortName",
    },
    {
      title: "Academic faculty",
      dataIndex: "academicFaculty",
      render: (academicFaculty: Partial<TAcademicFaculty>) =>
        academicFaculty?.name,
    },
    {
      title: "Students",
      dataIndex: "totalStudent",
    },
    {
      title: "Faculties",
      dataIndex: "totalFaculty",
    },
    {
      title: "Actions",
      render: (_: TAcademicDepartment, record: TAcademicDepartment) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<EditFilled />}
              onClick={() => {
                setModalVisible(true);
                setEditingAcademicDepartment(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the academic department"
              description="Are you sure to delete this academic department?"
              onConfirm={() => handleDeleteAcademicDepartment(record._id)}
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

  const handleDeleteAcademicDepartment = async (id: string) => {
    setIsLoadingDeleteId(id);
    try {
      const result = (await deleteAcademicDepartment(
        id
      ).unwrap()) as TResponse<TAcademicDepartment>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to delete academic department"
      );
    } finally {
      setIsLoadingDeleteId(null);
    }
  };

  return (
    <div className="">
      <div className="flex gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Academic department</h2>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add academic dept
        </Button>
      </div>

      {isLoadingAcademicDepartment ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : academicDepartment?.meta?.total === 0 ? (
        <Empty description="No academic dept found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={academicDepartment?.data}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          scroll={{ x: 800 }}
        />
      )}

      {/* Create academic department modal*/}
      <AcademicDepartmentModal
        open={modalVisible}
        setModalVisible={setModalVisible}
        setEditingAcademicDepartment={setEditingAcademicDepartment}
        editingAcademicDepartment={editingAcademicDepartment}
      />
    </div>
  );
};

export default AcademicDepartment;
