import { Button, Form, message, Modal, Skeleton } from "antd";
import React from "react";
import { TService } from "../../../types/service.type";
import {
  useCreateServiceMutation,
  useGetAllServicesQuery,
} from "../../../redux/features/servicesApi";
import { TResponse } from "../../../types/index.type";
import MyInp from "../../ui/Form/MyInp";
import { useCreateSlotMutation } from "../../../redux/features/slotApi";

type TProps = {
  open: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const SlotModal = ({ open, setModalVisible }: TProps) => {
  const [form] = Form.useForm();
  const [createService, { isLoading: isLoadingCreateSlot }] =
    useCreateSlotMutation();

  const { data: services, isLoading: isLoadingServices } =
    useGetAllServicesQuery([{ name: "limit", value: 1500 }]);

  const handleCreateSlot = async (values: TService) => {

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
      message.error(e?.data?.message || e?.message || "Failed to add slot!");
    } finally {
      setModalVisible(false);
      form.resetFields();
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        setModalVisible(false);
      }}
      className="p-4 bg-white rounded"
      footer={null}
    >
      <h2 className="font-bold text-xl mb-4">Create Slot</h2>

      {isLoadingServices ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <Form layout="vertical" form={form} onFinish={handleCreateSlot}>
          {/* Service Name */}
          <MyInp
            name="service"
            rules={[{ required: true, message: "Service is required!" }]}
            label="Service"
            placeholder="Please select a service"
            type="select"
            options={services?.data?.map((service: TService) => ({
              label: service.name,
              value: service._id,
            }))}
            size="large"
          />
          {/* Date */}
          <MyInp
            name="date"
            rules={[{ required: true, message: "Date is required!" }]}
            label="Date"
            placeholder="Please select a date"
            type="date"
            size="large"
          />
          {/* Start Time */}
          <MyInp
            name="startTime"
            rules={[{ required: true, message: "Start time is required!" }]}
            label="Start Time"
            placeholder="Enter start time"
            type="time"
            size="large"
          />
          {/* End Time */}
          <MyInp
            name="endTime"
            rules={[{ required: true, message: "End time is required!" }]}
            label="End Time"
            placeholder="Enter end time"
            type="time"
            size="large"
          />
          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              loading={isLoadingCreateSlot}
              disabled={services?.meta?.total === 0}
              htmlType="submit"
              block
              size="large"
            >
              Create Slot
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default SlotModal;
