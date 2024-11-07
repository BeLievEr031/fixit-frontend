import { useState } from "react";
import { Button, Drawer, Input, Radio, Space } from "antd";
const FilterDrawer = () => {
  const options = [
    {
      label: "Default",
      value: "Default",
    },
    {
      label: "From low to high",
      value: "From low to high",
    },
    {
      label: "From high to low",
      value: "From high to low",
    },
  ];
  const [open, setOpen] = useState(false);
  const [placement] = useState("left");
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Space style={{ marginTop: "10px" }}>
        <Button type="primary" onClick={showDrawer}>
          Filter
        </Button>
      </Space>
      <Drawer
        title="Select Filters"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <h1>Filters</h1>

        <p
          style={{ marginTop: "20px", marginBottom: "5px", fontWeight: "bold" }}
        >
          Location
        </p>
        <Space.Compact>
          <Input
            style={{
              width: "20%",
            }}
            defaultValue="PIN"
          />
          <Input
            style={{
              width: "80%",
            }}
            placeholder="Enter pin code"
          />
        </Space.Compact>

        <p
          style={{ marginTop: "20px", marginBottom: "5px", fontWeight: "bold" }}
        >
          Search by problem title
        </p>
        <Input
          placeholder="Enter your problem"
          style={{
            width: "82%",
          }}
        />

        <p
          style={{ marginTop: "20px", marginBottom: "5px", fontWeight: "bold" }}
        >
          Search by Price
        </p>
        <div>
          <Radio.Group block options={options} defaultValue="Default" />
        </div>
      </Drawer>
    </>
  );
};
export default FilterDrawer;
