import { Button, Form, message, Modal } from "antd";
import React, { useEffect } from "react";
import { TService } from "../../../types/service.type";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from "../../../redux/features/servicesApi";
import { TResponse } from "../../../types/index.type";
import MyInp from "../../ui/Form/MyInp";
type TProps = {
  open: boolean;
  editingService: Partial<TService> | null;
  setEditingService: React.Dispatch<
    React.SetStateAction<Partial<TService> | null>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ServicesModal = ({
  open,
  setModalVisible,
  editingService,
  setEditingService,
}: TProps) => {
  const [form] = Form.useForm();
  const [createService, { isLoading: isLoadingCreateService }] =
    useCreateServiceMutation();
  const [updateService, { isLoading: isLoadingUpdateService }] =
    useUpdateServiceMutation();

  useEffect(() => {
    if (editingService) {
      form.setFieldsValue({
        name: editingService.name,
        description: editingService.description,
        price: editingService.price,
        duration: editingService.duration,
      });
    }
  }, [form, editingService]);

  const handleCreateAcademicDepartment = async (values: TService) => {
    try {
      const result = (await createService(
        values
      ).unwrap()) as TResponse<TService>;
      if (result?.success) {
        message.success(result?.message);
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(e?.data?.message || e?.message || "Failed to add service!");
    } finally {
      setEditingService(null);
      setModalVisible(false);
      form.resetFields();
    }
  };

  const handleUpdateService = async (values: Partial<TService>) => {
    try {
      const res = (await updateService({
        ...values,
        _id: editingService?._id,
      }).unwrap()) as TResponse<TService>;
      if (res?.success) {
        message.success(res?.message);
      } else {
        message.error(res?.message);
      }
    } catch (error: any) {
      message.error(
        error?.data?.message || error?.message || "Failed to update service!"
      );
    } finally {
      setEditingService(null);
      setModalVisible(false);
      form.resetFields();
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        setEditingService(null);
        setModalVisible(false);
      }}
      className="p-4 bg-white rounded"
      footer={null}
    >
      <h2 className="font-bold text-xl mb-4">
        {editingService ? "Update service" : "Add service"}
      </h2>
       
        <Form
          layout="vertical"
          form={form}
          onFinish={
            editingService
              ? handleUpdateService
              : handleCreateAcademicDepartment
          }
        >
          {/* service name */}
          <MyInp
            name="name"
            rules={[
              {
                required: true,
                message: "Please input service name!",
              },
            ]}
            label="Service Name"
            placeholder="Enter service name"
            type="text"
            size="large"
          />
          <MyInp
            name="description"
            rules={[
              {
                required: true,
                message: "Please input service description!",
              },
            ]}
            label="Service description"
            placeholder="Enter service description"
            type="textarea"
            size="large"
          />
          <MyInp
            name="price"
            rules={[
              {
                required: true,
                message: "Please input price!",
              },
            ]}
            label="Price"
            placeholder="Enter price"
            type="number"
            size="large"
          />
          <MyInp
            name="duration"
            rules={[
              {
                required: true,
                message: "Please input duration!",
              },
            ]}
            label="Duration"
            placeholder="Enter duration!"
            type="number"
            size="large"
          />

          {/* Submit button */}
          <Form.Item>
            <Button
              type="primary"
              loading={
                editingService ? isLoadingUpdateService : isLoadingCreateService
              }
              htmlType="submit"
              block
              size="large"
            >
              {editingService ? "Update service" : "Insert service"}
            </Button>
          </Form.Item>
        </Form>
      
    </Modal>
  );
};

export default ServicesModal;
