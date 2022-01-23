import React from "react";
import "./CustomBottomStyle.css";
import { CustomButtonTypes } from "../../../types";

const CustomButton = ({
	height = "34px",
	width = "80px",
	icon = null,
	text = false,
	children,
	onClick,
}: CustomButtonTypes): JSX.Element => {
	return (
		<div
			onClick={onClick}
			style={{ height: height, width: width }}
			className='custom-button-container'
		>
			{icon}
			{text && <span className='button-text'>{children}</span>}
		</div>
	);
}

export default CustomButton;
