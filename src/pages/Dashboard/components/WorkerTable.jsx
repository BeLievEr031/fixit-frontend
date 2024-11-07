import { Button, Space, Table, Tag } from "antd";
import { PhoneOutlined, MoneyCollectOutlined } from "@ant-design/icons";
const columns = [
  {
    title: "Sr",
    dataIndex: "sr",
    key: "sr",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Per Hr",
    dataIndex: "perhr",
    key: "perhr",
    render: (_, record) => (
      <Tag icon={<MoneyCollectOutlined />} color="success">
        {record.amount}
      </Tag>
    ),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
    render: (_, record) => (
      <Tag
        icon={<PhoneOutlined />}
        color="lightcoral"
        style={{ fontSize: "15px", padding: "5px", fontWeight: "bold" }}
      >
        {record.phone}
      </Tag>
    ),
  },
  {
    idx: 4,
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button type="primary">Hire Me</Button>
      </Space>
    ),
  },
];
const data = [
  {
    sr: 1,
    key: "1",
    name: "John Brown",
    amount: 32,
    phone: "123456789",
  },
  {
    sr: "2",
    key: "2",
    name: "Jim Green",
    amount: 42,
    address: "London No. 1 Lake Park",
    phone: "123456789",
  },
  {
    sr: "3",
    key: "3",
    name: "Joe Black",
    amount: 32,
    address: "Sydney No. 1 Lake Park",
    phone: "123456789",
  },
  {
    sr: "4",
    key: "3",
    name: "Joe Black",
    amount: 32,
    address: "Sydney No. 1 Lake Park",
    phone: "123456789",
  },
  {
    sr: "5",
    key: "3",
    name: "Joe Black",
    amount: 32,
    address: "Sydney No. 1 Lake Park",
    phone: "123456789",
  },
];
const WorkerTable = () => {
  return <Table columns={columns} dataSource={data} pagination={false} />;
};
export default WorkerTable;
