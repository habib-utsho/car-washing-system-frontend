import { Button, Form, message, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import MyInp from "../../../ui/Form/MyInp";
import {
  useGetAllAcademicFacultyQuery,
  useInsertAcademicDepartmentMutation,
  useUpdateAcademicDepartmentMutation,
} from "../../../../redux/features/admin/academicManagementApi";
import { TAcademicDepartment } from "../../../../types/academicDepartment.types";
import { TAcademicFaculty } from "../../../../types/academicFaculty.types";
import { TResponse } from "../../../../types/index.type";

type TProps = {
  open: boolean;
  editingAcademicDepartment: Partial<TAcademicDepartment> | null;
  setEditingAcademicDepartment: React.Dispatch<
    React.SetStateAction<Partial<TAcademicDepartment> | null>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AcademicDepartmentModal = ({
  open,
  setModalVisible,
  editingAcademicDepartment,
  setEditingAcademicDepartment,
}: TProps) => {
  const [form] = Form.useForm();
  const { data: academicFaculty, isLoading: isAcademicFacultyLoading } =
    useGetAllAcademicFacultyQuery([]);
  const [
    createAcademicDepartment,
    { isLoading: isLoadingCreateAcademicDepartment },
  ] = useInsertAcademicDepartmentMutation();
  const [
    updateAcademicDepartment,
    { isLoading: isLoadingUpdateAcademicDepartment },
  ] = useUpdateAcademicDepartmentMutation();

  useEffect(() => {
    if (editingAcademicDepartment) {
      form.setFieldsValue({
        name: editingAcademicDepartment.name,
        shortName: editingAcademicDepartment.shortName,
        academicFaculty: editingAcademicDepartment.academicFaculty?._id,
      });
    }
  }, [form, editingAcademicDepartment]);

  const handleCreateAcademicDepartment = async (
    values: TAcademicDepartment
  ) => {
    try {
      const result = (await createAcademicDepartment(
        values
      ).unwrap()) as TResponse<TAcademicDepartment>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to add academic department"
      );
    } finally {
      setEditingAcademicDepartment(null);
      setModalVisible(false);
      form.resetFields();
    }
  };

  const handleUpdateAcademicDepartment = async (
    values: Partial<TAcademicDepartment>
  ) => {
    try {
      const res = (await updateAcademicDepartment({
        ...values,
        _id: editingAcademicDepartment?._id,
      }).unwrap()) as TResponse<TAcademicDepartment>;
      if (res?.success) {
        message.success(res?.message);
      } else {
        message.error(res?.message);
      }
    } catch (error: any) {
      message.error(
        error?.data?.message ||
          error?.message ||
          "Failed to update academic department"
      );
    } finally {
      setEditingAcademicDepartment(null);
      setModalVisible(false);
      form.resetFields();
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        setEditingAcademicDepartment(null);
        setModalVisible(false);
      }}
      className="p-4 bg-white rounded"
      footer={null}
    >
      <h2 className="font-bold text-xl mb-4">
        {editingAcademicDepartment
          ? "Update academic department"
          : "Add academic department"}
      </h2>
      {isAcademicFacultyLoading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <Form
          layout="vertical"
          form={form}
          onFinish={
            editingAcademicDepartment
              ? handleUpdateAcademicDepartment
              : handleCreateAcademicDepartment
          }
        >
          {/* Academic department name */}
          <MyInp
            name="name"
            rules={[
              {
                required: true,
                message: "Please input department name!",
              },
            ]}
            label="Department Name"
            placeholder="Department name"
            type="text"
            size="large"
          />
          <MyInp
            name="shortName"
            rules={[
              {
                required: true,
                message: "Please input department short name!",
              },
            ]}
            label="Department Short Name"
            placeholder="Enter short name for department"
            type="text"
            size="large"
          />
          <MyInp
            name="academicFaculty"
            rules={[
              {
                required: true,
                message: "Please select an academic faculty!",
              },
            ]}
            label="Faculty"
            placeholder="Select a faculty"
            type="select"
            size="large"
            options={academicFaculty?.data?.map((item: TAcademicFaculty) => ({
              value: item?._id,
              label: <span>{item?.name}</span>,
            }))}
          />

          {/* Submit button */}
          <Form.Item>
            <Button
              type="primary"
              loading={
                editingAcademicDepartment
                  ? isLoadingUpdateAcademicDepartment
                  : isLoadingCreateAcademicDepartment
              }
              htmlType="submit"
              block
              size="large"
            >
              {editingAcademicDepartment
                ? "Update academic department"
                : "Insert academic department"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default AcademicDepartmentModal;
