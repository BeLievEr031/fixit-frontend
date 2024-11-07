/* eslint-disable react/prop-types */
import { Button, Flex, Tag } from "antd";

function WorkerCard({ worker }) {
  const { name, expertise, initialPrice, phone } = worker;
  return (
    <Flex
      style={{
        width: "550px",
        border: "1px solid gray",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px lightgray",
        marginTop: "10px",
      }}
    >
      <div>
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>{name}</p>
        <p
          style={{
            fontSize: "15px",
            marginTop: "10px",
            display: "flex",
            gap: "5px",
          }}
        >
          Expertise:
          {expertise?.map((item, index) => {
            return (
              <Tag color="purple" key={index}>
                {item}
              </Tag>
            );
          })}
        </p>
        <Flex style={{ gap: "10px", marginTop: "10px" }}>
          <p style={{ textTransform: "capitalize" }}>
            <Tag color="volcano">per hr: {initialPrice} Rs</Tag>
          </p>
          <p>
            <Tag color="green" style={{ fontWeight: "bold" }}>
              Contact: {phone}
            </Tag>
          </p>
        </Flex>
      </div>
      <Button
        color="primary"
        variant="solid"
        style={{ width: "90px", height: "45px", marginTop: "25px" }}
      >
        Hire
      </Button>
    </Flex>
  );
}

export default WorkerCard;
