import React, { useEffect } from "react";
import { actions } from "../../store/store";
import "./FeedComponentSyle.css";
import { useDispatch } from "react-redux";
import { FeedProps } from "../../types";
import dots from "../../assets/icons/dots-vertical.svg";

export default function FeedComponent({ index, feed }: FeedProps) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.Feed.getData);
	}, [dispatch]);

	function openBottom(s: boolean) {
		dispatch(actions.BoolShit.changeBottomMenu(s));
		dispatch(actions.Feed.setBottom(feed));
	}

	return (
		<div className='feed-container'>
			<div className='feed-info-container'>
				<img alt={feed.avatarUrl} className='feed-avatar' src={feed.avatarUrl} />
				<div className='feed-email'>
					<b>{feed.email}</b>
				</div>
				<div
					className='icon dots-menu'
					onClick={() => {
						openBottom(true);
					}}
				>
					<img alt='icon' src={dots} />
				</div>
			</div>
			<img alt={feed.posts} loading='lazy' className='feed-picture' src={feed.posts} />
		</div>
	);
}
