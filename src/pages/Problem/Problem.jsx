import { useQuery } from "@tanstack/react-query";
import AddProblemDrawer from "./AddProblemDrawer";
import ProblemTable from "./ProblemTable";
import { useState } from "react";
import { fetchManyProblems } from "../../http/api";
import useAuthStore from "../../store/user-store";

function Problem() {
  const { user } = useAuthStore();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 7,
    sort: "desc",
  });

  const fetchProblems = async () => {
    const { data } = await fetchManyProblems({ ...pagination });
    // console.log(data);
    return data;
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["problems", pagination.page, pagination.limit, pagination.sort],
    queryFn: fetchProblems,
    // options: {
    //   keepPreviousData: true,
    // },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {user && user.role === "user" && <AddProblemDrawer />}
      {data && (
        <ProblemTable
          problemData={data}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </div>
  );
}

export default Problem;
