import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { login, self } from "../../http/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuthStore from "../../store/user-store";
const Login = () => {
  const { setUser } = useAuthStore();
  const loginUser = async (userData) => {
    const user = await login(userData);
    return user;
  };

  const getSelf = async () => {
    const { data } = await self();
    return data;
  };

  const { refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled: false,
  });

  const { mutate, isError, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      const { data } = await refetch();
      console.log(data);
      setUser(data);
    },
  });

  const onFinish = (values) => {
    const userData = {
      email: values.email,
      password: values.password,
    };
    console.log("Received values of form: ", userData);
    mutate(userData);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          width: "250px",
        }}
        onFinish={onFinish}
      >
        <p style={{ margin: "10px 0", fontWeight: "bold", fontSize: "18px" }}>
          {/* <LockOutlined /> */}
          Login
        </p>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="E-mail" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {isError && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {error.response.data.errors[0].msg}
          </div>
        )}
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Login
          </Button>
          or <Link to="/auth/signup">Register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
