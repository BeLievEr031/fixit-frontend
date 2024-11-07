/* eslint-disable react/prop-types */
import { Table, Tag } from "antd";

function MyBidTable({ workerBidData, pagination, setPagination }) {
  let columns = [
    {
      title: "Sr No.",
      dataIndex: "sr_no",
      key: "sr_no",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        let color = "green";
        if (status === "cancel") {
          color = "red";
        } else if (status === "pending") {
          color = "yellow";
        } else if (status === "unassigned") {
          color = "orange";
        }

        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       {user.role === "user" ? (
    //         <>
    //           <Button>Cancel</Button>
    //           <Button>Delete</Button>
    //           <ViewProblem problem={record} />
    //         </>
    //       ) : (
    //         <>
    //           <Button
    //             onClick={() => {
    //               navigate(`/problem/bid/${record._id}`, {
    //                 state: {
    //                   title: record.title,
    //                   description: record.description,
    //                 },
    //               });
    //             }}
    //           >
    //             See Bids
    //           </Button>
    //           <PlaceBidModal problemId={record._id} />
    //         </>
    //       )}
    //     </Space>
    //   ),
    // },
  ];

  let tableDate = workerBidData.map((item, index) => {
    return {
      sr_no: index + 1,
      title: item.problemId.title,
      description: item.problemId.description,
      amount: item.amount,
      status: item.problemId.status,
    };
  });

  const handleTableChange = (pagination) => {
    setPagination((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableDate}
        onChange={handleTableChange}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.totalWorkerBidCount,
        }}
        bordered
        rowKey="sr_no"
        style={{ textAlign: "center" }}
        title={() => <h2 style={{ margin: 0 }}>My All Bids</h2>} // Custom title
      />
    </div>
  );
}

export default MyBidTable;
