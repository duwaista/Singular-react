import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./styles.css";
import { IdType, FeedTypes } from "../../types";
import { baseUrl } from "../../api";
import Loading from "../../common/LoadingBar";
import FeedComponent from "../../components/FeedComponent";
import HeaderComponent from "../../components/HeaderComponent";
import FullScreenPicture from "../../components/FullScreenPicture";
import BottomPostMenu from "../Feed/components/BottomPostMenu";
import UserInfo from "./components/UserInfo";
import PageWrapper from "../../common/PageWrapper";

const Profile = (): JSX.Element => {
  const [userPosts, setUserPosts] = useState<FeedTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);

  const { id }: IdType = useParams();

  const loadUserPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/users/${id}/posts`);
      setUserPosts(response.data);
    } catch (e) {
      console.log(e);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  const userPostsList = useMemo(() => {
    return userPosts?.map((post: FeedTypes, index) => (
      <FeedComponent key={post.id} index={index} feed={post} />
    ));
  }, [userPosts]);

  useEffect(() => {
    if (!id) return;
    loadUserPosts();
  }, [id]);

  return (
    <>
      <FullScreenPicture />
      <BottomPostMenu />
      <HeaderComponent title="profile" showDrawer />
      <UserInfo />
      <PageWrapper>
        {userPostsList}
        {!userPostsList.length && !loading && !loadError && (
          <div className="no-content-text-container">
            <span className="no-content-text">У этого пользователя ещё нет постов</span>
          </div>
        )}
        {loadError && (
          <div className="no-content-text-container">
            {/* Why this isn't a component? Cus I'm broken */}
            <span className="no-content-text">При загрузке постов произошла ошибка</span>
          </div>
        )}
        {loading && <Loading />}
      </PageWrapper>
    </>
  );
};

export default Profile;
