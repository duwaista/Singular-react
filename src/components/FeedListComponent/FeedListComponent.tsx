import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./FeedListComponentStyle.css";
import { FeedTypes } from "../../types";
import { AppState, fetchFeed } from "../../store/store";
import FeedComponent from "../FeedComponent/FeedComponent";

const FeedListComponent = (): JSX.Element => {
	const dispatch = useDispatch();
	const feed: FeedTypes[] = useSelector((state: AppState) => state.feed.all);

	useEffect(() => {
		dispatch(fetchFeed());
	}, []);

	const feedList = useMemo(() => {
		return feed.map((feed: FeedTypes, index: number) => (
			<FeedComponent key={feed.id} index={index} feed={feed} />
		));
	}, [feed]);

	return (
		<div className={"feed-list-container"}>
			{feedList}
		</div>
	);
}

export default FeedListComponent;
