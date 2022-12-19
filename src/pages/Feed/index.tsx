import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../common/LoadingBar";

import BottomPostMenu from "./components/BottomPostMenu";
import FeedListComponent from "./components/FeedList";
import Upload from "../../components/UploadComponent/Upload";
import { AppState, fetchFeed } from "../../store/store";
import PageWrapper from "../../common/PageWrapper";
import FullScreenPicture from "../../components/FullScreenPicture";

const Feed = (): JSX.Element => {
  const loading: boolean = useSelector((state: AppState) => state.feed.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  return (
    <PageWrapper>
      <FullScreenPicture />
      <Upload />
      {loading && <Loading />}
      {!loading && <FeedListComponent />}
      <BottomPostMenu />
    </PageWrapper>
  );
};

export default Feed;
