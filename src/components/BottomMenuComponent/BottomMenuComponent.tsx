import React from "react";
import "./BottomMenuStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { actions, AppState, deletePostFetch } from "../../store/store";
import BasicElementBottom from "../BasicComponents/BasicElementBottom/BasicElementBottom";
import deleteIcon from "../../assets/icons/delete.svg";
import share from "../../assets/icons/share-variant.svg";
import edit from "../../assets/icons/edit.svg";
import { useTranslation } from "react-i18next";

export default function BottomMenuComponent(): JSX.Element {
	const dispatch = useDispatch();
	const bottom: boolean = useSelector((state: AppState) => state.boolshit.bottomMenu);
	const currentPost = useSelector((state: AppState) => state.feed.currentPost);
	const user = useSelector((state: AppState) => state.user);
	const { t } = useTranslation();

	function closeBottomMenu() {
		dispatch(actions.BoolShit.changeBottomMenu(false));
	}

	async function sharePic() {
		const shareData = {
			url: currentPost.feed.posts,
		};
		try {
			await navigator.share(shareData);
		} catch (err) {
			console.log(err);
		}
	}

	function editPost() {
		console.log("NO");
	}

	function deletePost() {
		dispatch(deletePostFetch({ currentPost }));
	}

	return (
		<div onClick={closeBottomMenu} className={`bottom-menu ${bottom && "bottom-menu-open"}`}>
			<div className={`bottom-menu-content ${bottom && "bottom-menu-content-open"}`}>
				{bottom && (
					<>
						<div className={"bottom-line-container"}>
							<div className={"small-button-line"}></div>
						</div>
						{user.logged && (
							<>
								{user.profile.uid === currentPost.feed.uid && (
									<>
										<BasicElementBottom
											onClick={deletePost}
											text={t("delete")}
											icon={deleteIcon}
										/>
										<BasicElementBottom
											onClick={editPost}
											text={t("edit")}
											icon={edit}
										/>
									</>
								)}
							</>
						)}
						<BasicElementBottom onClick={sharePic} text={t("share")} icon={share} />
					</>
				)}
			</div>
		</div>
	);
}
