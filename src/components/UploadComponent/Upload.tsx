import React, { useEffect, useState } from "react";
import "./UploadStyle.css";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../BasicComponents/CustomButton/CustomButton";
import { actions, AppState } from "../../store/store";

export default function Upload(): JSX.Element {
	const logged: boolean = useSelector((state: AppState) => state.user.logged);
	const progress = useSelector((state: AppState) => state.feed.uploadProgress);
	const [file, setFile] = useState<File | null>();
	const dispatch = useDispatch();

	function changeHandler(event: any) {
		const target = event.target as HTMLInputElement;
		const file: File = (target.files as FileList)[0];
		setFile(file);
	}

	useEffect(() => {
		if (progress.done && !progress.uploading) {
			setFile(null);
		}
	}, [progress]);

	async function addFile() {
		const maxImageSize: number = 5 * 1024 * 1024;
		const maxVideoSize: number = 20 * 1024 * 1024;

		if (file) {
			if (file.type.indexOf("image/") === 0 && file.size <= maxImageSize) {
				dispatch(actions.Feed.setUpload({ file, type: "image" }));
			} else if (file.type.indexOf("video/") === 0 && file.size <= maxVideoSize) {
				dispatch(actions.Feed.setUpload({ file, type: "video" }));
			} else {
				console.log("File too big");
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
						onChange={(event) => changeHandler(event)}
						className='upload-input'
					/>
					{!progress.uploading && (
						<CustomButton onClick={() => addFile()} height='30px' text={true}>
							Upload
						</CustomButton>
					)}
					<div className='upload-progress-container'>
						{progress.uploading && (
							<div
								style={{ width: progress.progress + "%" }}
								className='progress-line'
							></div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
