import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import deleteIcon from "../../../assets/icons/delete.svg";
import share from "../../../assets/icons/share-variant.svg";
import edit from "../../../assets/icons/edit.svg";

import { actions, AppState, deletePostFetch } from '../../../store/store';
import BasicElementBottom from '../../BasicComponents/BasicElementBottom/BasicElementBottom'
import BottomMenuComponent from '../../BottomMenuComponent/BottomMenuComponent'

const BottomPostMenu = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const showBottomMenu: boolean = useSelector((state: AppState) => state.boolshit.bottomMenu);
	const currentPost = useSelector((state: AppState) => state.feed.currentPost);
	const user = useSelector((state: AppState) => state.user);
	const userIsOwner = user.profile.uid === currentPost.feed.uid;

	const handleClose = () => {
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

	return (
		<BottomMenuComponent
			showMenu={showBottomMenu}
			onClose={handleClose}
		>
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
		</BottomMenuComponent>
	)
}

export default BottomPostMenu