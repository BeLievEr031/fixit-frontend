import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import {
  acceptBid,
  checkBidPlacedOrNot,
  fetchAllBidsOfProblem,
} from "../../http/api";
import { Button, Flex, Image, Pagination } from "antd";
import useAuthStore from "../../store/user-store";
import { useState } from "react";
import PlaceBidModal from "./PlaceBidModal";

function AllBids() {
  const { id } = useParams();
  const location = useLocation();

  const { title, description, imageSrc, ownerId, status } = location.state;
  console.log(status);

  const { user } = useAuthStore();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    sort: "asc",
    totalPage: 0,
  });

  const fetchBids = async () => {
    const { data } = await fetchAllBidsOfProblem(id, pagination);
    return data;
  };

  const handleCheckBidPlacedOrNot = async () => {
    const { data } = await checkBidPlacedOrNot(id);
    const { data: checkBidPlacdOrNotData } = data;
    return checkBidPlacdOrNotData;
  };

  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["bidsForProblem", id, pagination.page],
    queryFn: fetchBids,
    // staleTime: Infinity,
    keepPreviousData: true,
  });

  const { data: checkBidPlacdOrNotData } = useQuery({
    queryKey: ["checkBidPlacedOrNot", id],
    queryFn: handleCheckBidPlacedOrNot,
    enabled: user.role === "worker" ? true : false,
  });

  const handleAcceptBid = async (bidId) => {
    const { data } = await acceptBid(bidId);
    return data;
  };

  const { mutate } = useMutation({
    mutationKey: ["accept-bid"],
    mutationFn: handleAcceptBid,
    onSuccess: async (data) => {
      console.log(data);
      await refetch();
    },
  });

  if (isLoading) {
    return <div>loading..</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  // console.log(checkBidPlacdOrNotData);

  return (
    <div style={{ width: "100%" }}>
      <h1>All Bids</h1>

      {data && (
        <Flex
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "45%",
              height: "80vh",
              fontSize: "18px",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "10px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Image
              width={"350px"}
              height={"350px"}
              style={{ borderRadius: "10px" }}
              src={imageSrc}
            />
            <p
              style={{
                marginTop: "10px",
                fontWeight: "bold",
                color: "gray",
              }}
            >
              Title: {title}
            </p>
            <p style={{ marginTop: "10px", color: "gray" }}>
              Description: {description}
            </p>

            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "end",
                position: "absolute",
                right: "10px",
                bottom: "10px",
              }}
            >
              {ownerId === user.id ? (
                "Your are the owner"
              ) : status ? (
                "Bid Already Accepted."
              ) : checkBidPlacdOrNotData ? (
                "Bid Already Placed"
              ) : (
                <PlaceBidModal problemId={id} refetch={refetch} />
              )}
            </div>
          </div>

          <div style={{ width: "50%" }}>
            {data.bids.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    width: "80%",
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px",
                    marginTop: "10px",
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    backgroundColor:
                      user.id === item.workerId._id
                        ? "lightgreen"
                        : "transparent",
                  }}
                >
                  <div>
                    <p style={{ textTransform: "capitalize" }}>
                      Name: {item.workerId.name}
                    </p>
                    <p>Email: {item.workerId.email}</p>
                  </div>
                  <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                    {item.amount} Rs.
                  </p>
                  <Button
                    type="primary"
                    disabled={status === "pending" ? true : false}
                    onClick={() => {
                      mutate(item._id);
                      // console.log(item._id);
                    }}
                  >
                    {item.status ? "Accepted" : "Accept"}
                  </Button>
                </div>
              );
            })}

            {data.bids.length > 0 && (
              <Pagination
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: "10px",
                  width: "80%",
                }}
                simple={{
                  readOnly: true,
                }}
                defaultCurrent={pagination.page}
                total={data.totalCount}
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
        </Flex>
      )}
    </div>
  );
}

export default AllBids;
