import { Button, Form, message, Modal, Upload, UploadFile } from "antd";
import React, { useEffect, useState } from "react";
import { TService } from "../../../types/service.type";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from "../../../redux/features/servicesApi";
import { TResponse } from "../../../types/index.type";
import MyInp from "../../ui/Form/MyInp";
import { useUploadFileMutation } from "../../../redux/features/fileUpload";
import { UploadOutlined } from "@ant-design/icons";
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
  const [uploadFile, { isLoading: isLoadingUploadFile }] =
    useUploadFileMutation();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (editingService) {
      form.setFieldsValue({
        name: editingService.name,
        description: editingService.description,
        price: editingService.price,
        duration: editingService.duration,
      });
    }
    if (editingService?.img) {
      setFileList([
        {
          uid: "-1", // Unique identifier for the file
          name: "image.png", // Name of the file
          status: "done", // Status of the file (could be 'uploading', 'done', 'error', 'removed')
          url: editingService.img, // URL of the image
        },
      ]);
    }
  }, [form, editingService]);

  const handleCreateService = async (values: TService) => {
    try {
      if (fileList.length > 0 && fileList[0]?.originFileObj) {
        // formData.append("file", fileList[0].originFileObj);
        const formData = new FormData();
        formData.append("image", fileList[0].originFileObj);
        const file = await uploadFile(formData).unwrap();
        if (!file?.data?.url) {
          message.error("Image upload failed");
          return;
        }
        values.img = file?.data?.url;
      }

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
      setModalVisible(false);
      form.resetFields();
    }
  };

  const handleUpdateService = async (values: Partial<TService>) => {
    try {
      if (fileList.length > 0 && fileList[0]?.originFileObj) {
        // formData.append("file", fileList[0].originFileObj);
        const formData = new FormData();
        formData.append("image", fileList[0].originFileObj);
        const file = await uploadFile(formData).unwrap();
        if (!file?.data?.url) {
          message.error("Image upload failed");
          return;
        }
        values.img = file?.data?.url;
      }

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
        onFinish={editingService ? handleUpdateService : handleCreateService}
      >
        {/* Image */}
        <Form.Item
          label="Image"
          valuePropName="fileList"
          className="mb-6"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
            customRequest={({ file, onSuccess, onError }) => {
              setTimeout(() => {
                onSuccess({ url: URL.createObjectURL(file) }, file);
              }, 1000);
            }}
            showUploadList={{
              showPreviewIcon: true,
              showRemoveIcon: true,
            }}
            accept="image/*"
          >
            {fileList.length >= 1 ? null : (
              <div>
                <UploadOutlined />
                <div>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

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
          placeholder="Enter duration in minutes"
          type="number"
          size="large"
        />

        {/* Submit button */}
        <Form.Item>
          <Button
            type="primary"
            loading={
              isLoadingUpdateService ||
              isLoadingUploadFile ||
              isLoadingCreateService
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
