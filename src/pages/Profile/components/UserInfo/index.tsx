import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { actions, AppState } from '../../../../store/store';
import '../../styles.css'

const avatar = "https://sun9-65.userapi.com/impg/2cF_5ozpq0NeV1V8ezFij6KVKri10Fl27kEhKA/pyKgzAl19bU.jpg?size=1098x1002&quality=96&sign=c741277fe2a8ce690444ff8c2ddf030a&type=album";

const UserInfo = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const currentUser = useSelector((state: AppState) => state.user.profile);

	const openFullScreenPicture = (open: boolean, picture: string) => {
		dispatch(actions.BoolShit.changeFullScreenDialog(open));
		dispatch(actions.Feed.setPicture(picture));
	}

	return (
		<>
			<div className="user-profile-info-container">
				<img
					className="user-profile-avatar"
					alt="User avatar"
					onClick={() => openFullScreenPicture(true, avatar)}
					src={avatar}
				/>
				<div className="user-profile-info">
					<span className="user-profile-email">{currentUser.email}</span>
					<div className="user-edit-profile-button">
						<span>{t("edit")}</span>
					</div>
				</div>
				<div className="profile-bottom-line"></div>
			</div>
		</>
	)
}

export default UserInfo