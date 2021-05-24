import React from "react";
import "./LoadingBarStyle.css";

export default function Loading(): JSX.Element {
	return (
		<div className='center'>
			<div className='lds-ring'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
