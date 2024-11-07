/* eslint-disable react/prop-types */
import { Button, Space, Table, Tag } from "antd";
import ViewProblem from "./ViewProblem";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/user-store";
import { useNavigate } from "react-router-dom";
// import PlaceBidModal from "./PlaceBidModal";

// const data = [
//   {
//     sr_no: 1,
//     title: "Project A",
//     description: "Description for Project A.",
//     total_bids: 10,
//     status: "cancel",
//     image: "https://via.placeholder.com/150",
//   },
//   {
//     sr_no: 2,
//     title: "Project B",
//     description: "Description for Project B.",
//     total_bids: 5,
//     status: "completed",
//     image: "https://via.placeholder.com/150",
//   },
//   {
//     sr_no: 3,
//     title: "Project C",
//     description: "Description for Project C.",
//     total_bids: 8,
//     status: "pending",
//     image: "https://via.placeholder.com/150",
//   },
//   {
//     sr_no: 4,
//     title: "Project D",
//     description: "Description for Project D.",
//     total_bids: 15,
//     status: "completed",
//     image: "https://via.placeholder.com/150",
//   },
//   {
//     sr_no: 5,
//     title: "Project E",
//     description: "Description for Project E.",
//     total_bids: 3,
//     status: "pending",
//     image: "https://via.placeholder.com/125",
//   },
//   {
//     sr_no: 6,
//     title: "Project F",
//     description: "Description for Project F.",
//     total_bids: 3,
//     status: "pending",
//     image: "https://via.placeholder.com/150",
//   },
//   {
//     sr_no: 7,
//     title: "Project G",
//     description: "Description for Project G.",
//     total_bids: 3,
//     status: "pending",
//     image: "https://via.placeholder.com/150",
//   },
// ];
const ProblemTable = ({ problemData, pagination, setPagination }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [problems, setProblems] = useState([...problemData.data[0].results]);
  const [totalCount, setTotalCount] = useState(
    problemData?.data[0]?.totalCount[0]?.count
  );

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
      title: "Total Bids",
      dataIndex: "total_bids",
      key: "total_bids",
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
            {status === "pending"
              ? "Assigned".toUpperCase()
              : status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {user.role === "user" ? (
            <>
              <Button
                onClick={() => {
                  navigate(`/problem/bid/${record._id}`, {
                    state: {
                      title: record.title,
                      description: record.description,
                      imageSrc: record.imageSrc,
                      ownerId: record.creatorId,
                      status: record.status,
                    },
                  });
                }}
              >
                See Bids
              </Button>
              {/* <Button>Cancel</Button>
              <Button>Delete</Button> */}
              <ViewProblem problem={record} />
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  navigate(`/problem/bid/${record._id}`, {
                    state: {
                      title: record.title,
                      description: record.description,
                      imageSrc: record.imageSrc,
                      ownerId: record.creatorId,
                    },
                  });
                }}
              >
                See Bids
              </Button>
              {/* <PlaceBidModal problemId={record._id} /> */}
            </>
          )}
        </Space>
      ),
    },
  ];

  if (user.role === "worker") {
    columns = columns.filter((item) => {
      return item.title !== "Status";
    });
  }

  useEffect(() => {
    if (problemData && problemData.data.length > 0) {
      setProblems(problemData.data[0].results);
    }
  }, [problemData]);

  const tableData = problems.map((item, index) => {
    return {
      ...item,
      dataIndex: "",
      total_bids: item.totalBids,
      key: index,
      sr_no: index + 1,
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
    <Table
      columns={columns}
      dataSource={tableData}
      onChange={handleTableChange}
      pagination={{
        current: pagination.page,
        pageSize: pagination.limit,
        total: totalCount,
      }}
      bordered
      rowKey="sr_no"
      style={{ textAlign: "center" }}
      title={() => <h2 style={{ margin: 0 }}>Problem List</h2>} // Custom title
    />
  );
};
export default ProblemTable;
