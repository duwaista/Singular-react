import React from "react";
import "./LoadingBarStyle.css";

const Loading = (): JSX.Element => {
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

export default Loading;
