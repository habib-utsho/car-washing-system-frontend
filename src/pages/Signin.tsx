

type TSigninFieldType = {
  id?: string;
  password?: string;
};

const Signin = () => {
  const [signin, { isLoading }] = useSigninMutation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { token, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const { role } = (user as TDecodedUser) || {};

  if (token && role) {
    return <Navigate to={`/${role}/dashboard`} replace />; //TODO back to location history
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
        navigate(`/${user.role}/dashboard`);
      }
    } catch (e: any) {
      message.error(e?.message || e?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex mx-auto justify-center items-center bg-slate-50">
      <div className="p-8 md:p-10 my-shadow-1 rounded-md w-5/6 sm:w-4/6 md:3/6 lg:w-2/6 bg-white">
        <Typography.Title level={3} className="!mb-0">
          UMS Login
        </Typography.Title>
        <Typography.Text type="secondary" className="text-normal-desc">
          To manage university account
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
            name="id"
            label="Id"
            size="large"
            placeholder="Input your id"
            rules={[
              {
                required: true,
                message: "Id is required!",
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
            loading={isLoading}
          >
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
