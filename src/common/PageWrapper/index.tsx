import React from "react";

import "./styles.css";

interface IProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: IProps): JSX.Element => {
  return (
    <div className="application-page-wrapper">
      {children}
    </div>
  );
};

export default PageWrapper;
