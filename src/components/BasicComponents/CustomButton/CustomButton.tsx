import React from "react";
import "./CustomBottomStyle.css";
import { CustomButtonTypes } from "../../../types";

export default function CustomButton({
	height = "34px",
	width = "80px",
	icon = false,
	text = false,
	children,
	onClick,
}: CustomButtonTypes) {
	return (
		<div
			onClick={onClick}
			style={{ height: height, width: width }}
			className='custom-button-container'
		>
			{text && <span className='button-text'>{children}</span>}
			{icon && <div className={"button-text"}>{children}</div>}
		</div>
	);
}
