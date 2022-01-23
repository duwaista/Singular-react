import React, { useEffect, useMemo } from "react";
import "./FeedListComponentStyle.css";
import { FeedTypes } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppState, fetchFeed } from "../../store/store";
const FeedComponent = React.lazy(() => import("../FeedComponent/FeedComponent"));

const FeedListComponent = (): JSX.Element => {
	const dispatch = useDispatch();
	const all: FeedTypes[] = useSelector((state: AppState) => state.feed.all);

	useEffect(() => {
		dispatch(fetchFeed());
	}, []);

	return (
		<>
			<div className={"feed-list-container"}>
				{useMemo(() => {
					return all.map((feed: FeedTypes, index: number) => (
						<FeedComponent key={index} index={index} feed={feed} />
					));
				}, [all])}
			</div>
		</>
	);
}

export default FeedListComponent;
