import { Form, Input, InputNumber, Select } from "antd";
import React from "react";

type MyInpProps = {
  name: string | string[];
  label: string;
  type:
    | "text"
    | "number"
    | "password"
    | "email"
    | "checkbox"
    | "radio"
    | "select"
    | "textarea"
    | "date";
  rules?: any[];
  disabled?: boolean;
  placeholder: string;
  defaultValue?: string;
  options?: { label: string; value: string }[];
  size?: "small" | "middle" | "large";
};

// className="my-inp"
// defaultValue={"admin@gmail.com"}
const MyInp: React.FC<MyInpProps> = ({
  type,
  placeholder,
  name,
  label,
  rules,
  options,
  disabled,
  size = "large",
}) => {
  return (
    <Form.Item name={name} label={label} rules={rules} className="flex-1">
      {type === "text" ? (
        <Input size={size} placeholder={placeholder} disabled={disabled} />
      ) : type === "number" ? (
        <InputNumber
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : type === "password" ? (
        <Input.Password
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : type === "select" ? (
        <Select
          size={size}
          placeholder={placeholder}
          options={options}
          disabled={disabled}
        />
      ) : type === "date" ? (
        <Input
          type="date"
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        <Input size={size} placeholder={placeholder} disabled={disabled} />
      )}
    </Form.Item>
  );
};

export default MyInp;
