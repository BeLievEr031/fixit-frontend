import { Button, Checkbox, Flex, Image, Input, Form } from "antd";
import { useState } from "react";
import useAuthStore from "../../store/user-store";

function Profile() {
  const { user } = useAuthStore();
  const [isUpdate, setIsUpdate] = useState(false);

  const onCheckedChange = () => {
    setIsUpdate(!isUpdate);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // Here you can handle the updated values, e.g., send to API
    // setModal2Open(false); // Close modal after submission
  };

  return (
    <div>
      <Flex justify="space-evenly">
        <Image
          width={"35vw"}
          style={{ borderRadius: "10px" }}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />

        <Form
          name="view-profile"
          style={{ width: "50%" }}
          initialValues={{
            name: user.name,
            email: user.email,
            phone: user.phone,
            pincode: user.pincode,
            role: user.role,
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          {/* <Form.Item
          name="image"
          label="Image"
          rules={[
            {
              required: true,
              message: "Please input your image!",
            },
          ]}
        >
          {problem.image && (
            <img
              src={problem.image}
              alt={problem.title}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
          {isUpdate && <Input type="file" placeholder="Image" />}
        </Form.Item> */}
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your User name!",
              },
            ]}
          >
            <Input
              placeholder="Username"
              readOnly={!isUpdate}
              //   value={user.name}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              placeholder="Email"
              readOnly={!isUpdate} // Disable editing when not in update mode
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!",
              },
            ]}
          >
            <Input
              placeholder="Phone Number"
              readOnly={!isUpdate} // Disable editing when not in update mode
            />
          </Form.Item>
          <Form.Item
            name="pincode"
            label="Pin Code"
            rules={[
              {
                required: true,
                message: "Please input your Pin Code!",
              },
            ]}
          >
            <Input placeholder="Pin Code" readOnly={!isUpdate} />
          </Form.Item>

          <Form.Item name="role" label="Role">
            <Input placeholder="Role" readOnly={true} />
          </Form.Item>
          <Form.Item>
            <Checkbox onChange={onCheckedChange}>Check for update</Checkbox>
            <br />
            <br />
            <Button
              disabled={!isUpdate} // Disable button when not in update mode
              type="primary"
              htmlType="submit"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
}

export default Profile;
