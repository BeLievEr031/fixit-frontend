import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchWorkerBids } from "../../http/api";
import MyBidTable from "./MyBidTable";

function WorkerBid() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    sort: "asc",
  });

  const handleFetchWorkerBids = async () => {
    const { data } = await fetchWorkerBids(pagination);
    // const { data: workerBids } = data;
    return data;
  };

  const { data } = useQuery({
    queryKey: ["worker-bids", pagination.page],
    queryFn: handleFetchWorkerBids,
  });

  return (
    <div>
      {data && data?.data && (
        <MyBidTable
          workerBidData={data.data}
          pagination={{
            ...pagination,
            totalWorkerBidCount: data.totalWorkerBidCount,
          }}
          setPagination={setPagination}
        />
      )}
    </div>
  );
}

export default WorkerBid;
