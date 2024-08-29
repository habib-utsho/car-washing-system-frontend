import { ReactNode } from "react";

type TCommonSectionBanner = {
  title: ReactNode;
  subTitle: ReactNode;
  align?: "left" | "right" | "center";
};
const CommonSectionBanner: React.FC<TCommonSectionBanner> = ({
  title,
  subTitle,
  align,
}) => {
  return (
    <div className={`${align ? `text-${align}` : "text-center"} mb-6`}>
      <div
        className={`flex items-center gap-2 ${
          align === "left"
            ? "justify-start"
            : align === "right"
            ? "justify-end"
            : "justify-center"
        }  text-slate-700`}
      >
        <span className="h-[1.5px] w-[25px] bg-slate-700"></span>
        <p>{subTitle}</p>
      </div>
      <h2
        className={`font-bold text-2xl md:text-4xl ${
          align ? `text-${align}` : "text-center"
        }`}
      >
        {title}
      </h2>
    </div>
  );
};

export default CommonSectionBanner;
