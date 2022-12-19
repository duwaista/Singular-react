import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import "./style.css";
import { actions } from "../../store/store";
import { FeedProps } from "../../types";

import dots from "../../assets/icons/dots-vertical.svg";
import avatar from "../../assets/icons/account-circle-outline.svg";

const FeedComponent = ({ index, feed, style }: FeedProps): JSX.Element => {
  const dispatch = useDispatch();

  const openBottom = (open: boolean) => {
    dispatch(actions.BoolShit.changeBottomMenu(open));
    dispatch(actions.Feed.setBottom({ index, feed }));
  };

  const openFullScreen = (open: boolean, picture: string) => {
    dispatch(actions.BoolShit.changeFullScreenDialog(open));
    dispatch(actions.Feed.setPicture(picture));
  };

  const postImage = useMemo(() => {
    return (
      <img
        alt={feed.posts}
        loading="lazy"
        className="feed-picture"
        src={feed.posts}
        onClick={() => openFullScreen(true, feed.posts)}
      />
    );
  }, [feed.posts]);

  const feedContent = useMemo(() => {
    switch (feed.type) {
      case "video": {
        return (
          <video
            className="feed-picture"
            loop
            preload="none"
            controls
            src={feed.posts}
          />
        );
      }
      case "":
      case "image":
      default: {
        return postImage;
      }
    }
  }, [feed.type, feed.posts, postImage]);

  return (
    <div className="feed-container" style={style}>
      <div className="feed-info-container">
        <img
          alt={feed.avatarUrl || "No avatar"}
          className="feed-avatar"
          src={feed.avatarUrl || avatar}
        />
        <Link
          to={`/user/${feed.uid}`}
          className="feed-email"
        >
          <b>{feed.email}</b>
        </Link>
        <div
          className="icon dots-menu"
          onClick={() => openBottom(true)}
        >
          <img alt="icon" src={dots} />
        </div>
      </div>
      {feedContent}
    </div>
  );
};

export default FeedComponent;
