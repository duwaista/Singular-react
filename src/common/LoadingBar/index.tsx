import React from "react";

import "./style.css";

const Loading = (): JSX.Element => {
  return (
    <div className="center">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;
