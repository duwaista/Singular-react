import React, { useState } from "react";
import "./UploadStyle.css";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../BasicComponents/CustomButton/CustomButton";
import { actions, AppState } from "../../store/store";

export default function Upload() {
	const logged: boolean = useSelector((state: AppState) => state.user.logged);
	const [file, setFile] = useState<File>();
	const dispatch = useDispatch();

	function changeHandler(event: any) {
		setFile(event.target.files[0]);
	}

	async function addFile() {
		const maxImageSize: number = 5 * 1024 * 1024;
		const maxVideoSize: number = 20 * 1024 * 1024;

		if (file) {
			if (file.type.indexOf("image/") === 0 && file.size <= maxImageSize) {
				dispatch(actions.Feed.setUpload({ file, type: "image" }));
			} else if (file.type.indexOf("video/") === 0 && file.size <= maxVideoSize) {
				dispatch(actions.Feed.setUpload({ file, type: "video" }));
			} else {
				console.log("File too big", file.size/1024/1024 + ' of ' + maxVideoSize);
			}
		} else {
			console.log("Die");
		}
	}

	return (
		<>
			{logged && (
				<div className='upload-container'>
					<input
						accept='image/*, video/*'
						type='file'
						onChange={(e) => changeHandler(e)}
						className='upload-input'
					/>
					<CustomButton onClick={() => addFile()} height='30px' text={true}>
						Upload
					</CustomButton>
				</div>
			)}
		</>
	);
}
