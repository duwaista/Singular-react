import React, { useEffect } from "react";
import "./FullScreenDialogStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { AppState, actions } from "../../store/store";

export default function FullScreenDialog(): JSX.Element {
	const open: boolean = useSelector((state: AppState) => state.boolshit.fullScreenDialog);
	const picture: string = useSelector((state: AppState) => state.feed.picture);
	const dispatch = useDispatch();

	function closeFullScreen() {
		dispatch(actions.BoolShit.changeFullScreenDialog(false));
	}

	useEffect(() => {
		if (!open) {
			document.body.style.overflow = "auto";
		} else {
			document.body.style.overflow = "hidden";
		}
	}, [open]);

	return (
		<>
			{open && (
				<div className={`fullscreen-container${open && '-open'}`} onClick={closeFullScreen}>
					<div className='fullscreen-content'>
						<img src={picture} className='fullscreen-picture' alt='Full screen' />
					</div>
				</div>
			)}
		</>
	);
}
