/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

const ViewProblem = ({ problem }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [form] = Form.useForm(); // Create a form instance

  const onCheckedChange = () => {
    setIsUpdate(!isUpdate);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // Here you can handle the updated values, e.g., send to API
    // setModal2Open(false); // Close modal after submission
  };

  return (
    <>
      <Button type="primary" onClick={() => setModal2Open(true)}>
        Update
      </Button>
      <Modal
        title="Problem Details"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => {
          setModal2Open(false);
          setIsUpdate(false); // Reset update state
        }}
      >
        <Form
          form={form} // Attach the form instance
          name="view-problem"
          initialValues={{
            image: problem.image,
            title: problem.title,
            description: problem.description,
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
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
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input your Title!",
              },
            ]}
          >
            <Input
              placeholder="Title"
              readOnly={!isUpdate} // Disable editing when not in update mode
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <TextArea
              placeholder="Description"
              showCount
              maxLength={100}
              style={{
                height: 120,
                resize: "none",
              }}
              readOnly={!isUpdate} // Disable editing when not in update mode
            />
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
      </Modal>
    </>
  );
};

export default ViewProblem;
