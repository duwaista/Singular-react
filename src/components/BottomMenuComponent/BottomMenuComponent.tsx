import React, { useMemo } from "react";
import "./BottomMenuStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { actions, AppState, deletePostFetch } from "../../store/store";
import BasicElementBottom from "../BasicComponents/BasicElementBottom/BasicElementBottom";
import deleteIcon from "../../assets/icons/delete.svg";
import share from "../../assets/icons/share-variant.svg";
import edit from "../../assets/icons/edit.svg";
import { useTranslation } from "react-i18next";

const BottomMenuComponent = (): JSX.Element => {
	const dispatch = useDispatch();
	const bottom: boolean = useSelector((state: AppState) => state.boolshit.bottomMenu);
	const currentPost = useSelector((state: AppState) => state.feed.currentPost);
	const user = useSelector((state: AppState) => state.user);
	const userIsOwner = user.profile.uid === currentPost.feed.uid;
	const { t } = useTranslation();

	const closeBottomMenu = () => {
		dispatch(actions.BoolShit.changeBottomMenu(false));
	}

	const sharePic = async () => {
		const shareData = {
			url: currentPost.feed.posts,
		};
		try {
			await navigator.share(shareData);
		} catch (e) {
			console.log(e);
		}
	}

	const editPost = () => {
		console.log("NO");
	}

	const deletePost = () => {
		if (!user.logged) return;
		dispatch(deletePostFetch({ currentPost }));
	}

	const menu = useMemo(() => (
		<>
			<div className={"bottom-line-container"}>
				<div className={"small-button-line"}></div>
			</div>
			{userIsOwner && user.logged && (
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
			<BasicElementBottom onClick={sharePic} text={t("share")} icon={share} />
		</>
	), [userIsOwner, user, currentPost]);

	return (
		<div onClick={closeBottomMenu} className={`bottom-menu ${bottom && "bottom-menu-open"}`}>
			<div className={`bottom-menu-content ${bottom && "bottom-menu-content-open"}`}>
				{bottom && menu}
			</div>
		</div>
	);
}

export default BottomMenuComponent;
