import { Modal, Tag } from "antd";
import { TNotice } from "../../../types/notice.type";
import "../../../styles/editorDescription.css";

const NoticeDetailsModal = ({
  selectedNotice,
  setSelectedNotice,
}: {
  selectedNotice: TNotice | null;
  setSelectedNotice: React.Dispatch<React.SetStateAction<TNotice | null>>;
}) => {
  // Helper function to get the color and label for priority
  const getPriorityTag = (priority: string) => {
    switch (priority) {
      case "high":
        return <Tag color="red">High Priority</Tag>;
      case "medium":
        return <Tag color="orange">Medium Priority</Tag>;
      case "low":
        return <Tag color="green">Low Priority</Tag>;
      default:
        return <Tag>Unknown Priority</Tag>;
    }
  };
  return (
    <Modal
      title={selectedNotice?.name}
      open={!!selectedNotice}
      onCancel={() => setSelectedNotice(null)}
      footer={null}
      width={800}
    >
      {selectedNotice && (
        <div>
          <div className="mt-4 flex items-center gap-2">
            {getPriorityTag(selectedNotice.priority)}
          </div>
          <div
            className="mt-4 my-editor"
            dangerouslySetInnerHTML={{ __html: selectedNotice.description }}
          />
        </div>
      )}
    </Modal>
  );
};

export default NoticeDetailsModal;
