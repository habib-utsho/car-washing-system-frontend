import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Upload, UploadFile } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEditProfileMutation } from "../../redux/features/auth/authApi";
import { useUploadFileMutation } from "../../redux/features/fileUpload";
import Container from "../../components/ui/Container";
import MyInp from "../../components/ui/Form/MyInp";
import { UploadOutlined } from "@ant-design/icons";
import { TUser } from "../../types/index.type";
import { setUser } from "../../redux/features/auth/authSlice";

const EditProfile = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const [updateProfileForm] = Form.useForm();
  const [updateProfile, { isLoading: isLoadingUpdateProfile }] =
    useEditProfileMutation();
  const [uploadFile, { isLoading: isLoadingUploadFile }] =
    useUploadFileMutation();

  const dispatch = useAppDispatch();

  const { _id, name, phone, email, address, img } = user || {};
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    updateProfileForm.setFieldsValue({
      name,
      email,
      phone,
      address,
      img,
    });

    if (img) {
      setFileList([
        {
          uid: "-1", // Unique identifier for the file
          name: "profile_image", // You can replace this with an actual file name
          status: "done", // Set the status to "done" as the image is already uploaded
          url: img,
        },
      ]);
    }
  }, [name, phone, address, updateProfileForm, name, email]);

  const handleUpdateProfile = async (values: TUser) => {
    if (fileList.length > 0 && fileList[0]?.originFileObj) {
      // formData.append("file", fileList[0].originFileObj);
      const formData = new FormData();
      formData.append("image", fileList[0].originFileObj);
      const file = await uploadFile(formData).unwrap();
      if (!file?.data?.url) {
        message.error("Image upload failed");
        return;
      }
      values.img = file?.data?.url;
    }

    try {
      const result = await updateProfile({
        id: _id as string,
        payload: values,
      }).unwrap();

      // dispatch(setUser(result?.data));
      dispatch(setUser({ token: token, user: result?.data }));

      message.success(result?.message);
    } catch (e: any) {
      message.error(e?.message || e?.data?.message);
    }
  };

  return (
    <div>
      <Container className="py-8">
        <Form
          form={updateProfileForm}
          name="update-profile"
          onFinish={handleUpdateProfile}
          layout="vertical"
          className="bg-white my-shadow-1 p-4 rounded-md max-w-md md:max-w-xl mx-auto"
        >
          <h2 className="text-gray-00 font-semibold text-xl text-center my-4">
            Update Profile
          </h2>

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
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              customRequest={({ file, onSuccess, onError }) => {
                setTimeout(() => {
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
          <MyInp type="email" label="Email" name="email" disabled />

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
              loading={isLoadingUpdateProfile || isLoadingUploadFile}
            >
              Update profile
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  );
};

export default EditProfile;
