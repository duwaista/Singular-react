import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Profile.css";
import { AppState, actions } from "../../store/store";
import { IdType, FeedTypes } from "../../types";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FeedComponent from "../FeedComponent/FeedComponent";
import { useTranslation } from "react-i18next";
import axios, { AxiosResponse } from "axios";
import { baseUrl } from "../../api";
import Loading from "../BasicComponents/LoadingBar/LoadingBarComponent";

const avatar = "https://sun9-65.userapi.com/impg/2cF_5ozpq0NeV1V8ezFij6KVKri10Fl27kEhKA/pyKgzAl19bU.jpg?size=1098x1002&quality=96&sign=c741277fe2a8ce690444ff8c2ddf030a&type=album";

const ProfileComponent = (): JSX.Element => {
	const [userPosts, setUserPosts] = useState([])
	const [loading, setLoading] = useState(false)

	const currentUser = useSelector((state: AppState) => state.user.profile);
	const dispatch = useDispatch();

	const { t } = useTranslation();
	const { id }: IdType = useParams();

	const openFullScreenPicture = (open: boolean, picture: string) => {
		dispatch(actions.BoolShit.changeFullScreenDialog(open));
		dispatch(actions.Feed.setPicture(picture));
	}

	const loadUserPosts = async () => {
		setLoading(true)
		try {
			const responce: AxiosResponse = await axios.get(`${baseUrl}/users/${id}/posts`)
			setUserPosts(responce.data)
		} catch(e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

	const userPostsList = useMemo(() => {
		return userPosts?.map((post: FeedTypes, index) => (
			<FeedComponent key={post.id} index={index} feed={post} />
		))
	}, [userPosts])
	
	useEffect(() => {
		if (!id) return
		loadUserPosts()
	}, [id])

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
			{loading && <Loading />}
			{userPostsList}
			{!userPostsList.length && !loading && (
				<div className="no-content-text-container">
					<span className="no-content-text">У этого пользователя ещё нет постов</span>
				</div>
			)}
		</>
	);
}

export default ProfileComponent;
