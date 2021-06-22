import React, { useEffect, useMemo } from "react";
import "./FeedListComponentStyle.css";
import { FeedTypes } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppState, fetchFeed } from "../../store/store";
const FeedComponent = React.lazy(() => import("../FeedComponent/FeedComponent"));

export function FeedListComponent(): JSX.Element {
	const dispatch = useDispatch();
	const all: FeedTypes[] = useSelector((state: AppState) => state.feed.all);

	useEffect(() => {
		dispatch(fetchFeed());
	}, [dispatch]);

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
