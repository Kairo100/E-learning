import React from "react";

const Heading = (props:any) => {
  return (
    <div>
      <h3 className=" text-4xl font-semibold">
        {props.title1} <span className=" text-brightGreen">{props.title2}</span>
      </h3>
    </div>
  );
};

export default Heading;