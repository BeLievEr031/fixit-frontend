import { useState } from "react";
import { Button, Input, message, Steps, theme, Form, Flex } from "antd";
import { becomeWorker } from "../../http/api";
import { useMutation } from "@tanstack/react-query";
const BecomeWorker = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [initialPrice, setInitialPrice] = useState(0);
  let tSteps = 3;

  const handleBecomeWorker = async (workerData) => {
    const { data } = await becomeWorker(workerData);
    return data;
  };

  const { mutate } = useMutation({
    mutationKey: ["become-worker"],
    mutationFn: handleBecomeWorker,
    onSuccess: (data) => {
      console.log(data);
      window.location.reload();
    },
  });

  const steps = [
    {
      title: "First",
      content: (
        <Form
          layout="vertical"
          onFinish={(values) => {
            // setWorkerData({ ...workerData, phone: values.phone });
            console.log(values);

            setInitialPrice(+values.initialPrice);
            next();
          }}
          initialValues={{ initialPrice: 0 }}
          style={{
            width: "35%",
          }}
        >
          <Form.Item
            name="initialPrice"
            label="Initial Price"
            rules={[
              {
                required: true,
                message: "Please input your Initial Price!",
              },
            ]}
          >
            <Input placeholder="Initial Price" value={initialPrice} />
          </Form.Item>

          <Form.Item>
            {current < tSteps - 1 && (
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            )}
          </Form.Item>
        </Form>
      ),
    },
    // {
    //   title: "Second",
    //   content: (
    //     <Form
    //       layout="vertical"
    //       onFinish={(values) => {
    //         setWorkerData({ ...workerData, pincode: values.pincode });
    //         next();
    //       }}
    //       initialValues={{ pincode: workerData.pincode }}
    //       style={{
    //         width: "35%",
    //       }}
    //     >
    //       <Form.Item
    //         name="pincode"
    //         label="Pin Code"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please input your Pin Code!",
    //           },
    //           {
    //             len: 6,
    //             message: "Phone Number must be exactly 6 digits!",
    //           },
    //           {
    //             pattern: /^[0-9]*$/,
    //             message: "Phone Number must be numeric!",
    //           },
    //         ]}
    //       >
    //         <Input placeholder="Pin Code" value={workerData.pincode} />
    //       </Form.Item>

    //       <Form.Item>
    //         {current < tSteps - 1 && (
    //           <Button type="primary" htmlType="submit">
    //             Next
    //           </Button>
    //         )}
    //         {current > 0 && (
    //           <Button
    //             style={{
    //               margin: "0 8px",
    //             }}
    //             onClick={() => prev()}
    //           >
    //             Previous
    //           </Button>
    //         )}
    //       </Form.Item>
    //     </Form>
    //   ),
    // },
    {
      title: "Last",
      content: (
        <Flex>
          {/* {current === tSteps - 1 && ( */}
          <Button
            type="primary"
            // htmlType="submit"
            onClick={() => {
              console.log(initialPrice);
              const workerData = {
                initialPrice,
              };

              mutate(workerData);
              message.success("Processing complete!");
            }}
          >
            Become A worker Now
          </Button>
          {/* )} */}

          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </Flex>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    height: "40vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {/* {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )} */}
      </div>
    </>
  );
};
export default BecomeWorker;
