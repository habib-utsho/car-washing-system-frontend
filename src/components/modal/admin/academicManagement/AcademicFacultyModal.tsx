import { Button, Form, message, Modal, Skeleton } from "antd";
import React, { useEffect } from "react";
import MyInp from "../../../ui/Form/MyInp";
import { TAcademicFaculty } from "../../../../types/academicFaculty.types";
import {
  useInsertAcademicFacultyMutation,
  useUpdateAcademicFacultyMutation,
} from "../../../../redux/features/admin/academicManagementApi";
import { TResponse } from "../../../../types/index.type";

type TProps = {
  open: boolean;
  editingAcademicFaculty: Partial<TAcademicFaculty> | null;
  setEditingAcademicFaculty: React.Dispatch<
    React.SetStateAction<Partial<TAcademicFaculty> | null>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const AcademicFacultyModal = ({
  open,
  setModalVisible,
  editingAcademicFaculty,
  setEditingAcademicFaculty,
}: TProps) => {
  const [form] = Form.useForm();
  const [createAcademicFaculty, { isLoading: isLoadingCreateAcademicFaculty }] =
    useInsertAcademicFacultyMutation();
  const [updateAcademicFaculty, { isLoading: isLoadingUpdateAcademicFaculty }] =
    useUpdateAcademicFacultyMutation();

  useEffect(() => {
    if (editingAcademicFaculty) {
      form.setFieldsValue({
        name: editingAcademicFaculty.name,
      });
    }
  }, [form, editingAcademicFaculty]);

  const handleCreateAcademicFaculty = async (values: TAcademicFaculty) => {
    try {
      const result = (await createAcademicFaculty(
        values
      ).unwrap()) as TResponse<TAcademicFaculty>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(
        e?.data?.message || e?.message || "Failed to add academic faculty"
      );
    } finally {
      setEditingAcademicFaculty(null);
      setModalVisible(false);
      form.resetFields();
    }
  };

  const handleUpdateAcademicFaculty = async (
    values: Partial<TAcademicFaculty>
  ) => {
    try {
      const res = (await updateAcademicFaculty({
        ...values,
        _id: editingAcademicFaculty?._id,
      }).unwrap()) as TResponse<TAcademicFaculty>;
      if (res?.success) {
        message.success(res?.message);
      } else {
        message.error(res?.error?.message);
      }
    } catch (error: any) {
      message.error(
        error?.data?.message ||
          error?.message ||
          "Failed to update academic faculty"
      );
    } finally {
      setEditingAcademicFaculty(null);
      setModalVisible(false);
      form.resetFields();
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        setEditingAcademicFaculty(null);
        setModalVisible(false);
      }}
      className="p-4 bg-white rounded"
      footer={null}
    >
      <h2 className="font-bold text-xl mb-4">
        {editingAcademicFaculty
          ? "Update academic faculty"
          : "Add academic faculty"}
      </h2>
      (
      <Form
        layout="vertical"
        form={form}
        onFinish={
          editingAcademicFaculty
            ? handleUpdateAcademicFaculty
            : handleCreateAcademicFaculty
        }
      >
        {/* Academic faculty name */}
        <MyInp
          name="name"
          rules={[
            {
              required: true,
              message: "Please input faculty name!",
            },
          ]}
          label="Academic Faculty Name"
          placeholder="Enter academic faculty name"
          type="text"
          size="large"
        />

        {/* Submit button */}
        <Form.Item>
          <Button
            type="primary"
            loading={
              editingAcademicFaculty
                ? isLoadingUpdateAcademicFaculty
                : isLoadingCreateAcademicFaculty
            }
            htmlType="submit"
            block
            size="large"
          >
            {editingAcademicFaculty
              ? "Update academic faculty"
              : "Insert academic faculty"}
          </Button>
        </Form.Item>
      </Form>
      )
    </Modal>
  );
};

export default AcademicFacultyModal;
