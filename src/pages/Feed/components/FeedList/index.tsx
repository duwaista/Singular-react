import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { List, AutoSizer } from "react-virtualized";

import "./styles.css";
import { AppState } from "../../../../store/store";
import FeedComponent from "../../../../components/FeedComponent/FeedComponent";

type IPostItemGetter = {
  index: number;
  style: React.CSSProperties;
};

const FeedListComponent = (): JSX.Element => {
  const posts = useSelector((state: AppState) => state.feed.posts);

  const getListItem = useCallback(({ index, style }: IPostItemGetter) => {
    return (
      <FeedComponent
        // style={style}
        key={posts[index].id || posts[index]._id}
        index={index}
        feed={posts[index]}
      />
    );
  }, [posts]);

  // 999 IQ lol
  const feedContainer = useMemo(() => {
    if (!posts.length) return null;
    return (
      <AutoSizer disableHeight>
        {({ height, width }) => (
          <List
            width={width}
            height={height || posts.length * 408}
            overscanRowCount={10}
            rowCount={posts.length}
            rowHeight={408}
            rowRenderer={({ index, style }) => {
              return getListItem({ index, style });
            }}
          />
        )}
      </AutoSizer>
    );
  }, [getListItem, posts.length]);

  return (
    <div className="feed-list-container">
      {feedContainer}
    </div>
  );
};

export default FeedListComponent;
