import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/BasicComponents/LoadingBar/LoadingBarComponent'

import BottomPostMenu from '../../components/FeedComponent/components/BottomPostMenu'
import FeedListComponent from './components/FeedList'
import FullScreenDialog from '../../components/FullScreenPictureComponent/FullScreenDialog'
import Upload from '../../components/UploadComponent/Upload'
import { AppState, fetchFeed } from '../../store/store'

const Feed = () => {
	const dispatch = useDispatch()

	const loading: boolean = useSelector((state: AppState) => state.feed.loading);

	useEffect(() => {
		dispatch(fetchFeed());
	}, []);

	return (
		<>
			{loading && <Loading />}
			<FullScreenDialog />
			<Upload />
			<BottomPostMenu />
			<FeedListComponent />
		</>
	)
}

export default Feed