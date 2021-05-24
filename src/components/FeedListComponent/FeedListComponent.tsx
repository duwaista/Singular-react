import React, { useEffect, useMemo } from "react";
import "./FeedListComponentStyle.css";
import { FeedTypes } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppState, fetchFeed } from "../../store/store";
import Loading from "../BasicComponents/LoadingBar/LoadingBarComponent";
const FeedComponent = React.lazy(() => import("../FeedComponent/FeedComponent"));

export function FeedListComponent(): JSX.Element {
	const dispatch = useDispatch();
	const all: FeedTypes[] = useSelector((state: AppState) => state.feed.all);
	const loading: boolean = useSelector((state: AppState) => state.boolshit.loading);

	useEffect(() => {
		dispatch(fetchFeed());
	}, [dispatch]);

	return (
		<>
			<div className={"feed-list-container"}>
				{useMemo(() => {
					loading && <Loading />;
				}, [loading])}
				{useMemo(() => {
					return all.map((feed: FeedTypes, index: number) => (
						<FeedComponent key={index} index={index} feed={feed} />
					));
				}, [all])}
			</div>
		</>
	);
}
