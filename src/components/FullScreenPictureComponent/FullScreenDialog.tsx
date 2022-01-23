import React from "react";
import "./FullScreenDialogStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState, actions } from "../../store/store";

const FullScreenDialog = (): JSX.Element => {
	const open: boolean = useSelector((state: AppState) => state.boolshit.fullScreenDialog);
	const picture: string = useSelector((state: AppState) => state.feed.picture);
	const dispatch = useDispatch();

	const closeFullScreen = () => {
		dispatch(actions.BoolShit.changeFullScreenDialog(false));
	}

	return (
		<>
			<div
				className={`fullscreen-container ${open && "fullscreen-container-open"}`}
				onClick={closeFullScreen}
			>
				{open && (
					<div className='fullscreen-content'>
						<img src={picture} className='fullscreen-picture' alt='Full screen' />
					</div>
				)}
			</div>
		</>
	);
}

export default FullScreenDialog;
