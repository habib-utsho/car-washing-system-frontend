import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import { useEditPasswordMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { TPasswordUpdate } from "../../types/index.type";
import { signOut } from "../../redux/features/auth/authSlice";

const ChangePassword = () => {
  const [changePassForm] = Form.useForm();
  const [changePassword, { isLoading: isLoadingChangePassword }] =
    useEditPasswordMutation();

  const { user } = useAppSelector((state) => state.auth);
  const { _id } = user || {};

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangePassword = async (data: TPasswordUpdate) => {
    try {
      const result = await changePassword({
        id: _id as string,
        payload: data,
      }).unwrap();

      message.success(result?.message);
      dispatch(signOut());
      navigate("/signin");
    } catch (e: any) {
      message.error(e?.data?.message || e?.message);
    }
  };

  return (
    <div>
      <Container className={"py-8"}>
        <Form
          form={changePassForm}
          name="passwordChangeForm"
          layout="vertical"
          onFinish={handleChangePassword}
          className="bg-white my-shadow-1 rounded-md p-6 md:max-w-4xl mx-auto"
        >
          <h2 className="font-bold text-2xl md:text-3xl mb-8">
            Change password
          </h2>
          <Form.Item
            label="Old password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please enter your old password",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter old password here"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="New password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please enter your new password",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter new password here"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-one w-full"
              loading={isLoadingChangePassword}
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  );
};

export default ChangePassword;
