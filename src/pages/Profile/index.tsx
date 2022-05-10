import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios, { AxiosResponse } from "axios";

import "./styles.css";
import { AppState, actions } from "../../store/store";
import { IdType, FeedTypes } from "../../types";
import { baseUrl } from "../../api";
import Loading from "../../components/BasicComponents/LoadingBar/LoadingBarComponent";
import FeedComponent from "../../components/FeedComponent/FeedComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import FullScreenDialog from "../../components/FullScreenPictureComponent/FullScreenDialog";
import BottomPostMenu from "../../components/FeedComponent/components/BottomPostMenu";
import UserInfo from "./components/UserInfo";

const Profile = (): JSX.Element => {
	const [userPosts, setUserPosts] = useState([])
	const [loading, setLoading] = useState(false)

	const { id }: IdType = useParams();

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
			{loading && <Loading />}
			<FullScreenDialog />
			<BottomPostMenu />
			<HeaderComponent title="profile" icon={true} />
			<UserInfo />
			{userPostsList}
			{!userPostsList.length && !loading && (
				<div className="no-content-text-container">
					<span className="no-content-text">У этого пользователя ещё нет постов</span>
				</div>
			)}
		</>
	);
}

export default Profile;
