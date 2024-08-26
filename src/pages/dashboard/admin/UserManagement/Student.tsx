import {
  Button,
  Empty,
  Input,
  message,
  Popconfirm,
  Skeleton,
  Table,
} from "antd";

import { DeleteFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import { useState } from "react";
import { TQueryParam, TResponse } from "../../../types/index.type";
import {
  useDeleteStudentMutation,
  useGetAllStudentQuery,
} from "../../../redux/features/admin/userManagementApi";
import { TStudent } from "../../../types/student.types";
import moment from "moment";
import StudentDetailsModal from "../../../components/modal/admin/userManagement/StudentDetailsModal";
import StudentModal from "../../../components/modal/admin/userManagement/StudentModal";

const Student = () => {
  const { Search } = Input;
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [detailsModalVisible, setDetailsModalVisible] =
    useState<boolean>(false);
  const [editingStudent, setEditingStudent] =
    useState<Partial<TStudent> | null>(null);
  const {
    data: students,
    isLoading: isLoadingStudent,
    isFetching,
  } = useGetAllStudentQuery([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
    ...params,
  ]);
  const [deleteStudent] = useDeleteStudentMutation();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name: TStudent["name"]) =>
        `${name.firstName} ${name.middleName ? name.middleName : ""} ${
          name.lastName
        }`,
    },
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Roll",
      dataIndex: "academicInfo",
      render: (academicInfo: TStudent["academicInfo"]) => academicInfo.roll,
    },
    {
      title: "Batch",
      dataIndex: "academicInfo",
      render: (academicInfo: TStudent["academicInfo"]) =>
        academicInfo.batch.batch,
    },
    {
      title: "Department",
      dataIndex: "academicInfo",
      render: (academicInfo: TStudent["academicInfo"]) =>
        academicInfo.department.name,
    },
    {
      title: "Admission Date",
      dataIndex: "academicInfo",
      render: (academicInfo: TStudent["academicInfo"]) =>
        moment(academicInfo.admissionDate).format("DD-MM-YYYY"),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      render: (text: Date) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Actions",
      render: (_: TStudent, record: TStudent) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<EyeFilled />}
              onClick={() => {
                setDetailsModalVisible(true);
                setEditingStudent(record);
              }}
            >
              Details
            </Button>
            <Button
              type="primary"
              icon={<EditFilled />}
              onClick={() => {
                setModalVisible(true);
                setEditingStudent(record);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the student"
              description="Are you sure to delete this student?"
              onConfirm={() => handleDeleteStudent(record._id)}
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

  const handleDeleteStudent = async (id: string) => {
    setIsLoadingDeleteId(id);
    try {
      const result = (await deleteStudent(id).unwrap()) as TResponse<TStudent>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to delete student"
      );
    } finally {
      setIsLoadingDeleteId(null);
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl">Student</h2>
        <Search
          placeholder="Search student"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add student
        </Button>
      </div>

      {isLoadingStudent ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : students?.meta?.total === 0 ? (
        <Empty description="No student found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={students?.data}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          scroll={{ x: 800 }}
          loading={isLoadingStudent || isFetching}
          pagination={{
            total: students?.meta?.total,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}

      {/* View details student modal */}
      <StudentDetailsModal
        detailsModalVisible={detailsModalVisible}
        setDetailsModalVisible={setDetailsModalVisible}
        setEditingStudent={setEditingStudent}
        editingStudent={editingStudent}
      />

      {/* Create and update student modal*/}
      <StudentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setEditingStudent={setEditingStudent}
        editingStudent={editingStudent}
      />
    </div>
  );
};

export default Student;
