/* eslint-disable react/prop-types */
import { Button, Space, Table, Tag } from "antd";
import { PhoneOutlined, MoneyCollectOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { acceptBid } from "../../../http/api";

const BidTable = ({ lastProblemEntry }) => {
  let bidData = lastProblemEntry.topFiveBids;
  // console.log(lastProblemEntry.lastProblemEntry.status);

  const handleAcceptBid = async (bidId) => {
    const { data } = await acceptBid(bidId);
    return data;
  };

  const { mutate } = useMutation({
    mutationKey: ["accept-bid"],
    mutationFn: handleAcceptBid,
    onSuccess: (data) => {
      console.log(data);
    },
  });

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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
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
      render: (_, order) => (
        <Space size="middle">
          <Button
            type="primary"
            disabled={order.problemStatus === "pending" ? true : false}
            onClick={() => {
              mutate(order.bidId);
            }}
          >
            {order.status ? "Accepted" : "Accept"}
          </Button>
        </Space>
      ),
    },
  ];

  bidData = bidData.map((item, index) => {
    const obj = {
      sr: index + 1,
      key: index + 1,
      name: item.workerId.name,
      amount: item.amount,
      address: "Sydney No. 1 Lake Park",
      phone: item.workerId.phone,
      bidId: item._id,
      status: item.status,
      problemStatus: lastProblemEntry.lastProblemEntry.status,
    };

    return obj;
  });

  return <Table columns={columns} dataSource={bidData} pagination={false} />;
};
export default BidTable;
