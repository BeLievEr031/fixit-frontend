import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { self } from "../../http/api";
import useAuthStore from "../../store/user-store";
import { useEffect } from "react";
// import useAuthStore from "../../store/user-store";
function Root() {
  // Otherwise Move to auth page
  const { user, setUser } = useAuthStore();

  console.log(user);

  const handleSelfRoute = async () => {
    const { data } = await self();
    return data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["self"],
    queryFn: handleSelfRoute,
  });

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data, setUser]);

  // Login then move to dashboard
  return <div>{isLoading ? "Loading...." : <Outlet />}</div>;
}

export default Root;
