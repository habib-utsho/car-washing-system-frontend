import React from "react";

type TContainer = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<TContainer> = ({ children, className }) => {
  return (
    <div className={`max-w-[1400px] mx-4 md:mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;

// import React from "react";

// type ContainerProps = {
//   children: React.ReactNode;
// };

// const Container: React.FC<ContainerProps> = ({ children }) => {
//   return <div className="max-w-7xl mx-4 md:mx-auto ">{children}</div>;
// };

// export default Container;
