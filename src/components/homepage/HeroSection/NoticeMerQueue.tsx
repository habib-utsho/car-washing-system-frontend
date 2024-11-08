import { useState } from "react";
import Marquee from "react-fast-marquee";
import { useGetAllNoticeQuery } from "../../../redux/features/noticeApi";
import { TResponse } from "../../../types/index.type";
import { TNotice } from "../../../types/notice.type";
import NoticeDetailsModal from "../../modal/admin/NoticeDetailsModal";

const NoticeMerQueue = () => {
  const { data: notices, isLoading: isLoadingNotice } = useGetAllNoticeQuery([
    { name: "page", value: 1 },
    { name: "limit", value: 500000 },
    { name: "status", value: "active" },
  ]);

  const noticesData = notices as TResponse<TNotice[]>;

  const [selectedNotice, setSelectedNotice] = useState<TNotice | null>(null);

  if (isLoadingNotice || noticesData?.meta?.total === 0) return null;

  return (
    <div>
      <div className="bg-primary/5 p-3 rounded-md mt-6">
        {/* <div className="bg-primary/10 p-3 rounded-md mt-6"> */}
        <Marquee gradient={false} speed={50} pauseOnHover>
          {noticesData?.data?.map((notice: TNotice, ind: number) => {
            return (
              <span
                key={ind}
                className={`  font-semibold mx-4 cursor-pointer`}
                onClick={() => setSelectedNotice(notice)}
              >
                🚨 {notice?.name}
              </span>
            );
          })}
        </Marquee>
      </div>

      <NoticeDetailsModal
        selectedNotice={selectedNotice}
        setSelectedNotice={setSelectedNotice}
      />
    </div>
  );
};

export default NoticeMerQueue;
