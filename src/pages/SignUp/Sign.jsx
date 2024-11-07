import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  AimOutlined,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../http/api";
const SignUp = () => {
  const navigate = useNavigate();
  const signUser = async (userData) => {
    const user = await register(userData);
    return user;
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signUser,
    onSuccess: () => {
      navigate("/auth/login");
      return;
    },
  });

  const onFinish = (values) => {
    const userData = {
      name: values.username,
      email: values.email,
      password: values.password,
      phone: values.phone,
      pincode: values.pincode,
    };
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
          Sign Up
        </p>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

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
          name="phone"
          rules={[
            {
              len: 10,
              message: "The input is not valid phone!",
            },
            {
              required: true,
              message: "Please input your phone!",
            },
            {
              pattern: /^[0-9]*$/,
              message: "Phone Number must be numeric!",
            },
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Phone" />
        </Form.Item>
        <Form.Item
          name="pincode"
          rules={[
            {
              len: 6,
              message: "The input is not valid pincode!",
            },
            {
              required: true,
              message: "Please input your pincode!",
            },
            {
              pattern: /^[0-9]*$/,
              message: "Phone Number must be numeric!",
            },
          ]}
        >
          <Input prefix={<AimOutlined />} placeholder="pincode" />
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
          <Button block type="primary" htmlType="submit" loading={isPending}>
            Sign Up
          </Button>
          or <Link to="/auth/login">Login now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
