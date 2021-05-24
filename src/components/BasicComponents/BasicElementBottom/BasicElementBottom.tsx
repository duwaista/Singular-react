import React from "react";
import "./BasicElementBottomStyle.css";
import { BasicElementProps } from "../../../types";

export default function BasicElementBottom({
	text,
	icon,
	onClick,
}: BasicElementProps): JSX.Element {
	return (
		<div onClick={onClick} className='basic-element-bottom-container'>
			<img alt='icon' className='icon basic-element' src={icon} />
			<span>{text}</span>
		</div>
	);
}
