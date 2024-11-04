import { Button, Form, message, Upload, UploadFile } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/features/auth/authApi";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import MyInp from "../components/ui/Form/MyInp";

const Signup = () => {
  const navigate = useNavigate();
  const [signupForm] = Form.useForm();
  const [createUser, { isLoading: isSignupLoading }] = useSignupMutation();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSignup = async (data: any) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    // Append image file if present
    if (fileList.length > 0 && fileList[0]?.originFileObj) {
      formData.append("file", fileList[0].originFileObj);
      // const formData = new FormData();
      // formData.append("image", fileList[0].originFileObj);
      // const file = await uploadFile(formData).unwrap();
      // if (!file?.data?.url) {
      //   message.error("Image upload failed");
      //   return;
      // }
      // data.img = file?.data?.url;
    }

    try {
      const result = await createUser(formData).unwrap();
      if (result?.success) {
        message.success({
          content: result?.message || "Signup successful",
        });
        navigate("/signin");
      } else {
        message.error({
          content: result?.message || "Signup failed",
        });
      }
    } catch (error: any) {
      message.error({
        content: error?.message || error?.data?.message || "Signup failed",
      });
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className=" py-6 sm:py-8 lg:py-12">
          <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
            <Form
              form={signupForm}
              name="signup"
              onFinish={handleSignup}
              layout="vertical"
              className="bg-white my-shadow-1 p-4 rounded-md max-w-md md:max-w-xl mx-auto"
            >
              <p className="text-gray-00 text-xl text-center my-4">
                Signup to{" "}
                <strong className="my-text-gradient-1">Cleanify</strong>
              </p>

              {/* Profile Image Upload */}
              <Form.Item
                label="Profile Image"
                valuePropName="fileList"
                className="mb-6"
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e && e.fileList;
                }}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={({ fileList: newFileList }) =>
                    setFileList(newFileList)
                  }
                  // @ts-ignore
                  customRequest={({ file, onSuccess, onError }) => {
                    setTimeout(() => {
                      // @ts-ignore
                      onSuccess({ url: URL.createObjectURL(file) }, file);
                    }, 1000);
                  }}
                  showUploadList={{
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                  }}
                  accept="image/*"
                >
                  {fileList.length >= 1 ? null : (
                    <div>
                      <UploadOutlined />
                      <div>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              {/* Name */}
              <MyInp
                type="text"
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                ]}
                placeholder="Enter name here"
              />

              {/* Email */}
              <MyInp
                type="email"
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
                placeholder="Enter email here"
              />

              {/* Password */}
              <MyInp
                type="password"
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
                placeholder="Enter password here"
              />

              {/* Phone */}
              <MyInp
                type="text"
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                ]}
                placeholder="Enter phone number here"
              />

              {/* Address */}
              <MyInp
                type="text"
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please enter your address",
                  },
                ]}
                placeholder="Enter address here"
              />

              {/* Submit */}
              <Form.Item>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={isSignupLoading}
                >
                  Signup
                </Button>
              </Form.Item>

              <p className="mt-2 flex gap-1 items-center">
                Already have an account?{" "}
                <Link to={"/signin"}>
                  <Button className="btn-outline-one">Signin</Button>
                </Link>{" "}
              </p>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
