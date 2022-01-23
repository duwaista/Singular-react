import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Profile.css";
import { AppState, actions, fetchFeed } from "../../store/store";
import { IdType, FeedTypes } from "../../types";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FeedComponent from "../FeedComponent/FeedComponent";
import { useTranslation } from "react-i18next";

const avatar = "https://sun9-65.userapi.com/impg/2cF_5ozpq0NeV1V8ezFij6KVKri10Fl27kEhKA/pyKgzAl19bU.jpg?size=1098x1002&quality=96&sign=c741277fe2a8ce690444ff8c2ddf030a&type=album";

const ProfileComponent = (): JSX.Element => {
	const { id }: IdType = useParams();
	const currentUser = useSelector((state: AppState) => state.user.profile);
	const all: FeedTypes[] = useSelector((state: AppState) => state.feed.all);
	const { t } = useTranslation();

	//========== Dw i'm fine ==========//
	// Shit updated
	const filteredAll = useMemo(() => all.filter((al) => al.uid === id), [all, id]);
	const dispatch = useDispatch();

	const openFullScreenPicture = (open: boolean, picture: string) => {
		dispatch(actions.BoolShit.changeFullScreenDialog(open));
		dispatch(actions.Feed.setPicture(picture));
	}

	useEffect(() => {
		if (!all.length) dispatch(fetchFeed());
	}, [all.length]);

	return (
		<>
			<HeaderComponent title="profile" icon={true} />
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
			{useMemo(() => {
				return filteredAll.map((feed: FeedTypes, index: number) => (
					<FeedComponent key={index} index={index} feed={feed} />
				));
			}, [filteredAll])}
		</>
	);
}

export default ProfileComponent;
