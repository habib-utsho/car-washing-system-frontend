import { Button, Form, FormProps, message, Typography } from "antd";
import { useSigninMutation } from "../redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
        const user = verifyJwtToken(result?.data?.accessToken) as TDecodedUser;
        dispatch(setUser({ token: result.data?.accessToken, user: user }));
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
          Cleanify
        </Typography.Title>
        <Typography.Text type="secondary" className="text-normal-desc">
          To clean your car always
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
            className="w-full !my-6"
            loading={isLoadingSignin}
          >
            Sign in
          </Button>
        </Form>

        {/* Forgot pass and signup */}
        <div className="flex flex-wrap justify-between gap-2">
          <p className="mt-2 flex gap-1 items-center">
            New here?{" "}
            <Link to={"/signup"}>
              <Button className="btn-outline-one">Signup</Button>
            </Link>{" "}
          </p>

          <p className="mt-2 flex gap-1 items-center">
            <Link
              to={"/signin?forgot-password=true"}
              className="hover:text-primary-2"
            >
              Forgot password?
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
