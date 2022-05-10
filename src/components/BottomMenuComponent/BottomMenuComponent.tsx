import React from "react";

import "./BottomMenuStyle.css";
import { IBottomPostMenu } from "../../types";

const BottomMenuComponent = ({
	children,
	closeOnOutsideClick = true,
	showMenu,
	onClose,
}: IBottomPostMenu): JSX.Element => {
	const closeBottomMenu = () => {
		if (closeOnOutsideClick) onClose()
	}

	return (
		<div
			onClick={closeBottomMenu}
			className={`bottom-menu ${showMenu && "bottom-menu-open"}`}
		>
			<div className={`bottom-menu-content ${showMenu && "bottom-menu-content-open"}`}>
				{showMenu && (
					<>
						<div className={"bottom-line-container"}>
							<div className={"small-button-line"}></div>
						</div>
						{children || null}
					</>
				)}
			</div>
		</div>
	);
}

export default BottomMenuComponent;
