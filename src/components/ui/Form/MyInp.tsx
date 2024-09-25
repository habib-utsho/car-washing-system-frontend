import { LockOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import React from "react";

type MyInpProps = {
  name: string | string[];
  label?: string;
  type:
    | "text"
    | "number"
    | "password"
    | "email"
    | "checkbox"
    | "radio"
    | "select"
    | "textarea"
    | "date"
    | "time";
  rules?: any[];
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  options?: { label: string; value: string }[];
  size?: "small" | "middle" | "large";
  value?: string;
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
  defaultValue,
}) => {
  return (
    <Form.Item name={name} label={label} rules={rules} className="flex-1">
      {type === "text" ? (
        <Input
          size={size}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
        />
      ) : type === "number" ? (
        <InputNumber
          size={size}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full"
          defaultValue={defaultValue}
        />
      ) : type === "password" ? (
        <Input.Password
          size={size}
          placeholder={placeholder}
          prefix={<LockOutlined />}
          disabled={disabled}
          defaultValue={defaultValue}
        />
      ) : type === "select" ? (
        <Select
          size={size}
          placeholder={placeholder}
          options={options}
          disabled={disabled}
        />
      ) : type === "time" ? (
        <Input
          type="time"
          size={size}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
        />
      ) : type === "date" ? (
        <DatePicker
          placeholder={placeholder}
          size="large"
          disabled={disabled}
          className="w-full"
          defaultValue={defaultValue}

          // defaultValue={dayjs('2019-09-03', dateFormat)}
          // minDate={dayjs('2019-08-01', dateFormat)}
          // maxDate={dayjs('2020-10-31', dateFormat)}
        />
      ) : type === "textarea" ? (
        <Input.TextArea
          size={size}
          placeholder={placeholder}
          disabled={disabled}
          rows={6}
        />
      ) : (
        <Input size={size} placeholder={placeholder} disabled={disabled} />
      )}
    </Form.Item>
  );
};

export default MyInp;
