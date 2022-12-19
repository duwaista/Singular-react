import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../common/LoadingBar";

import BottomPostMenu from "../../components/FeedComponent/components/BottomPostMenu";
import FeedListComponent from "./components/FeedList";
import Upload from "../../components/UploadComponent/Upload";
import { AppState, fetchFeed } from "../../store/store";
import PageWrapper from "../../common/PageWrapper";

const FullScreenPicture = React.lazy(() => import("../../components/FullScreenPictureComponent"));

const Feed = (): JSX.Element => {
  const loading: boolean = useSelector((state: AppState) => state.feed.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  return (
    <PageWrapper>
      <Suspense fallback={<Loading />}>
        <FullScreenPicture />
      </Suspense>
      <Upload />
      {loading && <Loading />}
      {!loading && <FeedListComponent />}
      <BottomPostMenu />
    </PageWrapper>
  );
};

export default Feed;
