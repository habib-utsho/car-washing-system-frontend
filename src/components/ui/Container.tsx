import React from "react";

type TContainer = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<TContainer> = ({ children, className }) => {
  return (
    <div className={`max-w-[1400px] mx-auto ${className}`}>{children}</div>
  );
};

export default Container
