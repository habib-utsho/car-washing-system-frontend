import { Button, Form, message, Modal, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { TResponse } from "../../../types/index.type";
import MyInp from "../../ui/Form/MyInp";
import {
  useCreateNoticeMutation,
  useUpdateNoticeMutation,
} from "../../../redux/features/noticeApi";
import { TNotice } from "../../../types/notice.type";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  [{ header: [1, 2, false] }],
  ["bold", "italic", "underline"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  ["link", "image"],
  ["clean"],
];

type TProps = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  editingNotice: TNotice | null;
  setEditingNotice: React.Dispatch<React.SetStateAction<TNotice | null>>;
};

const NoticeModal = ({
  isModalVisible,
  setIsModalVisible,
  editingNotice,
  setEditingNotice,
}: TProps) => {
  const [form] = Form.useForm();
  const [createNotice, { isLoading: isLoadingCreateNotice }] =
    useCreateNoticeMutation();
  const [updateNotice, { isLoading: isLoadingUpdateService }] =
    useUpdateNoticeMutation();
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (editingNotice) {
      form.setFieldsValue({
        ...editingNotice,
      });
      setDescription(editingNotice.description || "");
    } else {
      form.resetFields();
    }
  }, [editingNotice, form]);

  const onFinish = async (values: TNotice) => {
    values.description = description;
    let action = editingNotice
      ? updateNotice({ id: editingNotice?._id, body: values })
      : createNotice(values);

    try {
      const result = (await action.unwrap()) as TResponse<TNotice>;
      if (result?.success) {
        message.success(result?.message);

        setIsModalVisible(false);
        setEditingNotice(null);
        setDescription("");
        form.resetFields();
      } else {
        message.error(result?.message);
      }
    } catch (e: any) {
      message.error(e?.data?.message || e?.message || "Failed to add notice!");
    }
  };

  return (
    <Modal
      open={isModalVisible || !!editingNotice}
      onCancel={() => {
        form.resetFields();
        setIsModalVisible(false);
        setDescription("");
        setEditingNotice(null);
      }}
      className="p-4 bg-white rounded"
      width={800}
      footer={null}
    >
      <h2 className="font-bold text-xl mb-4">
        {editingNotice ? "Update Notice" : "Create Notice"}
      </h2>

   
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* Notice Name */}
          <MyInp
            name="name"
            rules={[{ required: true, message: "Name is required!" }]}
            label="Notice Name"
            placeholder="Enter notice name"
            type="text"
            size="large"
          />
          {/* Description */}
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            placeholder="What's on your mind?"
            modules={{ toolbar: toolbarOptions }}
            className="my-4"
          />
          {/* Status */}
          <MyInp
            name="status"
            rules={[{ required: true, message: "Status is required!" }]}
            label="Status"
            placeholder="Select status"
            type="select"
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
            size="large"
          />
          {/* Priority */}
          <MyInp
            name="priority"
            rules={[{ required: true, message: "Priority is required!" }]}
            label="Priority"
            placeholder="Select priority"
            type="select"
            options={[
              { label: "High", value: "high" },
              { label: "Medium", value: "medium" },
              { label: "Low", value: "low" },
            ]}
            size="large"
          />
          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              loading={isLoadingCreateNotice || isLoadingUpdateService}
              htmlType="submit"
              block
              size="large"
            >
              {editingNotice ? "Update Notice" : "Create Notice"}
            </Button>
          </Form.Item>
        </Form>
 
    </Modal>
  );
};

export default NoticeModal;
