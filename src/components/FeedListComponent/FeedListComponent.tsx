import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List } from "react-virtualized/dist/commonjs/List";
import { AutoSizer } from "react-virtualized/dist/commonjs/AutoSizer";

import "./FeedListComponentStyle.css";
import { FeedTypes } from "../../types";
import { AppState, fetchFeed } from "../../store/store";
import FeedComponent from "../FeedComponent/FeedComponent";

type IPostItemGetter = {
	index: number;
	style: any;
}

const FeedListComponent = (): JSX.Element => {
	const dispatch = useDispatch();
	const feed: FeedTypes[] = useSelector((state: AppState) => state.feed.all);

	useEffect(() => {
		dispatch(fetchFeed());
	}, []);

	const getListItem = ({ index, style }: IPostItemGetter) => {
		return (
			<FeedComponent
				key={feed[index].id}
				index={index}
				feed={feed[index]}
			/>
		)
	}

	// 999 IQ lol
	const feedContainer = useMemo(() => {
		if (!feed.length) return null
		return (
			<AutoSizer disableHeight>
				{({ height, width }) => (
					<List
						width={width}
						height={feed.length * 408}
						overscanRowCount={10}
						rowCount={feed.length}
						rowHeight={408}
						rowRenderer={({ index, style }) => getListItem({ index, style })}
					/>
				)}
			</AutoSizer>
		)
	}, [feed])

	return (
		<div className={"feed-list-container"}>
			{feedContainer}
		</div>
	);
}

export default FeedListComponent;
