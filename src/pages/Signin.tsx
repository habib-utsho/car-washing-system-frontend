import { Button, Form, FormProps, message, Typography } from "antd";
import { useSigninMutation } from "../redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Navigate, useNavigate } from "react-router-dom";
import { TDecodedUser } from "../types/index.type";
import verifyJwtToken from "../utils/verifyJwtToken";
import { setUser } from "../redux/features/auth/authSlice";
import MyInp from "../components/ui/Form/MyInp";

type TSigninFieldType = {
  id?: string;
  password?: string;
};

const Signin = () => {
  const [signin, { isLoading: isLoadingSignin }] = useSigninMutation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { token, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const { role } = (user as TDecodedUser) || {};

  if (token && role) {
    return <Navigate to={`/`} replace />; //TODO back to location history
  }

  const handleSignin: FormProps<TSigninFieldType>["onFinish"] = async (
    data
  ) => {
    try {
      const result = await signin(data).unwrap();
      if (result.success) {
        console.log(result, "result");
        const user = verifyJwtToken(result?.data?.accessToken) as TDecodedUser;
        dispatch( ({ token: result.data?.accessToken, user: user }));
        message.success(result?.message);
        navigate(`/`);
      }
    } catch (e: any) {
      message.error(e?.message || e?.data?.message);
    }
  };

  return (
    <div className="min-h-[88vh] flex mx-auto justify-center items-center bg-slate-50">
      <div className="p-8 md:p-10 my-shadow-1 rounded-md w-5/6 sm:w-4/6 md:3/6 lg:w-2/6 bg-white">
        <Typography.Title level={3} className="!mb-0">
          Car washing system
        </Typography.Title>
        <Typography.Text type="secondary" className="text-normal-desc">
          To take a service
        </Typography.Text>
        <Form
          onFinish={handleSignin}
          // initialValues={{ remember: true }}
          // autoComplete="off"
          form={form}
          layout="vertical"
          className="mt-2 "
        >
          <MyInp
            type="text"
            name="email"
            label="Email"
            size="large"
            placeholder="Input your email"
            rules={[
              {
                required: true,
                message: "Email is required!",
              },
            ]}
          />
          <MyInp
            type="password"
            name="password"
            label="Password"
            size="large"
            placeholder="Input your password"
            rules={[
              {
                required: true,
                message: "Password is required!",
              },
            ]}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="w-full !mt-8"
            loading={isLoadingSignin}
          >
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
