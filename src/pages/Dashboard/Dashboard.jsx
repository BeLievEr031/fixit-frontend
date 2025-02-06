import { Flex } from "antd";
import BidTable from "./components/BidTable";
// import WorkerTable from "./components/WorkerTable";
import { useQuery } from "@tanstack/react-query";
import { getDashboard, getLastProblemEntry } from "../../http/api";
function Dashboard() {
  const handleDashboard = async () => {
    const { data } = await getDashboard();
    const { data: dashboardData } = data;
    return dashboardData;
  };

  const handleLastProblemEntry = async () => {
    const { data } = await getLastProblemEntry();
    const { data: lastEntryProblem } = data;
    return lastEntryProblem;
  };

  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: handleDashboard,
  });

  const { data: lastProblemEntry } = useQuery({
    queryKey: ["lastProblemEntry"],
    queryFn: handleLastProblemEntry,
  });

  return (
    <div>
      <h1>Dashboard</h1>
      {/* <Flex></Flex> */}
      <Flex style={{ paddingTop: "15px", gap: "10px" }}>
        <div
          style={{
            backgroundColor: "#FFA726",
            width: "200px",
            height: "120px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            color: "white",
          }}
        >
          <h2>Raised Issue</h2>
          <p style={{ fontSize: "50px", margin: "0" }}>
            {data && data.totalRaisedProblems}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "lightgreen",
            width: "200px",
            height: "120px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#388E3C",
            fontWeight: "bold",
          }}
        >
          <h2>Solved Issue</h2>
          <p style={{ fontSize: "50px", margin: "0" }}>
            {data && data.totalSolvedProlems}
          </p>
        </div>

        {/* <div
          style={{
            backgroundColor: "lightblue",
            width: "200px",
            height: "120px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#1976D2",
            fontWeight: "bold",
          }}
        >
          <h2>Paid Amount</h2>
          <p style={{ fontSize: "50px", margin: "0" }}>02</p>
        </div> */}
      </Flex>

      <Flex
        style={{
          marginTop: "25px",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <div>
          <h3>
            Top Bids For{" "}
            {lastProblemEntry &&
              lastProblemEntry.lastProblemEntry &&
              lastProblemEntry.lastProblemEntry.title}
          </h3>
          <div>
            {lastProblemEntry && (
              <BidTable lastProblemEntry={lastProblemEntry} />
            )}
          </div>
        </div>
        {/* <div>
          <h3>Top Workers</h3>
          <div>
            <WorkerTable />
          </div>
        </div> */}
      </Flex>
    </div>
  );
}

export default Dashboard;
