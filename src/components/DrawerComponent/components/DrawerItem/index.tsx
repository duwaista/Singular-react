import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

import "./style.css";

type Props = {
  linkTo?: string;
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const DrawerItem = ({ linkTo, children, onClick }: Props): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick) onClick(e);
  };

  if (!linkTo) {
    return (
      <div
        className="drawer-item-container"
        onClick={handleClick}
      >
        {children}
      </div>
    );
  }

  return (
    <Link
      to={linkTo}
      className="drawer-item-container"
    >
      {children}
    </Link>
  );
};

export default DrawerItem;
