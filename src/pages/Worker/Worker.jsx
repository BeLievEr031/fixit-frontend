import { Flex, Pagination } from "antd";
// import TopWorkerTable from "../../components/TopWorkerTable";
import WorkerCard from "./WorkerCard";
import FilterDrawer from "./FilterDrawer";
import { useQuery } from "@tanstack/react-query";
import { fetchWorkers } from "../../http/api";
import { useState } from "react";

function Worker() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 2,
    sort: "asc",
    totalCount: 0,
  });
  const handleFetchWorker = async () => {
    const { data } = await fetchWorkers(pagination);
    setPagination((prev) => ({
      ...prev,
      totalCount: data.totalCount,
    }));
    const { data: workers } = data;
    return workers;
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["worker", pagination.page],
    queryFn: handleFetchWorker,
  });

  console.log(data);

  return (
    <div>
      <h1>Worker</h1>

      <FilterDrawer />

      <Flex justify="space-between" style={{ width: "90%" }}>
        <div style={{ paddingTop: "20px" }}>
          <div
            style={{
              height: "80vh",
              overflow: "scroll",
              scrollbarWidth: "none",
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              // justifyContent: "center",
              gap: "10px",
              borderRadius: "10px",
            }}
          >
            {data &&
              data.map((worker, index) => (
                <WorkerCard key={index} worker={worker} />
              ))}
            {data && (
              <Pagination
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "10px",
                }}
                simple={{
                  readOnly: true,
                }}
                defaultCurrent={pagination.page}
                total={pagination.totalCount}
                pageSize={pagination.limit}
                onChange={(data) => {
                  setPagination((prev) => ({
                    ...prev,
                    page: data,
                  }));
                }}
              />
            )}
          </div>
        </div>
        <div>{/* <TopWorkerTable /> */}</div>
      </Flex>
    </div>
  );
}

export default Worker;
