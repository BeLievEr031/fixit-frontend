import { useState } from "react";
import { Button, Drawer, Space } from "antd";
import ProblemForm from "./ProblemForm";
const AddProblemDrawer = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={showDrawer}
          style={{ margin: "10px 0" }}
        >
          Add Problem
        </Button>
      </Space>
      <Drawer
        title="Add Problem Details"
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"left"}
        width={500}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <ProblemForm setOpen={setOpen} />
      </Drawer>
    </>
  );
};
export default AddProblemDrawer;
