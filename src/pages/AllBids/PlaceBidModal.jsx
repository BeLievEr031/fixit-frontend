/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import useAuthStore from "../../store/user-store";
import { placeBidForProblem } from "../../http/api";
import { useMutation } from "@tanstack/react-query";
const PlaceBidModal = ({ problemId, refetch }) => {
  const [modal2Open, setModal2Open] = useState(false);
  const [form] = Form.useForm();
  const { user } = useAuthStore();

  const placeBid = async (bidData) => {
    const { data } = await placeBidForProblem(bidData);
    return data;
  };

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: placeBid,
    onSuccess: async (data) => {
      await refetch();
      form.resetFields();
    },
    // onError: (error) => {
    //   // Handle error here
    // },
  });

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const bidData = {
      amount: +values.bidAmount,
      problemId: problemId,
      workerId: user.id,
    };

    mutate(bidData);
    setModal2Open(false);
  };

  if (isError) {
    console.log(error);
  }

  return (
    <>
      {!isSuccess && (
        <Button type="primary" onClick={() => setModal2Open(true)}>
          Place Bid
        </Button>
      )}
      <Modal
        title="Place Bid"
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <Form
          layout="vertical"
          name="place-bid-form"
          form={form}
          initialValues={{
            bidAmount: "",
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="bidAmount"
            label="Bid Amount"
            rules={[
              {
                required: true,
                message: "Please input your bid amount!",
              },
              {
                pattern: /^[0-9]*$/,
                message: "Bid Amount must be numeric!",
              },
            ]}
          >
            <Input placeholder="Enter Bid Amount" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Bid
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default PlaceBidModal;
