import { ReactNode } from "react";

type TCommonSectionBanner = {
  title: ReactNode;
};
const CommonSectionBanner: React.FC<TCommonSectionBanner> = ({ title }) => {
  return (
    <div className="py-4">
      <h2 className="font-bold text-xl md:text-2xl p-2 !bg-primary rounded rounded-tr-3xl text-white inline-flex gap-1 items-center my-shadow-1">
        {title}
      </h2>
    </div>
  );
};

export default CommonSectionBanner;
