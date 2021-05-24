import React, { useEffect } from "react";
import "./BottomMenuStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { actions, AppState, deletePostFetch } from "../../store/store";
import BasicElementBottom from "../BasicComponents/BasicElementBottom/BasicElementBottom";
import deleteIcon from "../../assets/icons/delete.svg";
import share from "../../assets/icons/share-variant.svg";

export default function BottomMenuComponent(): JSX.Element {
	const dispatch = useDispatch();
	const bottom: boolean = useSelector((state: AppState) => state.boolshit.bottomMenu);
	const currentPost = useSelector((state: AppState) => state.feed.currentPost);
	const logged: boolean = useSelector((state: AppState) => state.user.logged);

	function closeBottomMenu() {
		dispatch(actions.BoolShit.changeBottomMenu(false));
	}

	useEffect(() => {
		if (!bottom) {
			document.body.style.overflow = "auto";
		} else {
			document.body.style.overflow = "hidden";
		}
	}, [bottom]);

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

	function deletePost() {
		dispatch(deletePostFetch({ currentPost }));
	}

	return (
		<div onClick={closeBottomMenu} className={`bottom-menu ${bottom && "bottom-menu-open"}`}>
			{bottom && (
				<div className={"bottom-menu-content"}>
					<div className={"bottom-line-container"}>
						<div className={"small-button-line"}></div>
					</div>
					{logged && (
						<BasicElementBottom onClick={deletePost} text='Удалить' icon={deleteIcon} />
					)}
					<BasicElementBottom onClick={sharePic} text='Поделиться' icon={share} />
				</div>
			)}
		</div>
	);
}
