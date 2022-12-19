import React from "react";

import "./style.css";

type Props = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  height?: string;
  width?: string;
  text?: boolean;
  disabled?: boolean;
  icon?: null | string;
};

const CustomButton = ({
  height = "34px",
  width = "80px",
  icon = null,
  text = false,
  disabled = false,
  children,
  onClick,
}: Props): JSX.Element => {
  return (
    <button
      type="button"
      disabled={disabled}
      className="custom-button-container"
      style={{ height, width }}
      onClick={onClick}
    >
      {icon}
      {text && <span className="button-text">{children}</span>}
    </button>
  );
};

export default CustomButton;
