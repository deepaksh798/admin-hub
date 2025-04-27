import React from "react";

export const runtime = "edge";

type Props = {};

const WrongPath = (props: Props) => {
  return <div className="text-2xl">This path is not exist</div>;
};

export default WrongPath;
