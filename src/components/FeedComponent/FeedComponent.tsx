import React from "react";
import { actions } from "../../store/store";
import "./FeedComponentSyle.css";
import { useDispatch } from "react-redux";
import { FeedProps } from "../../types";
import dots from "../../assets/icons/dots-vertical.svg";
import avatar from "../../assets/icons/account-circle-outline.svg";

export default function FeedComponent({ index, feed }: FeedProps) {
	const dispatch = useDispatch();

	function openBottom(s: boolean) {
		dispatch(actions.BoolShit.changeBottomMenu(s));
		dispatch(actions.Feed.setBottom({index, feed}));
	}

	return (
		<div className='feed-container'>
			<div className='feed-info-container'>
				{feed.avatarUrl !== null ? (
					<img alt={feed.avatarUrl} className='feed-avatar' src={feed.avatarUrl} />
				) : (
					<img alt={feed.avatarUrl} className='feed-avatar' src={avatar} />
				)}
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
			{feed.type === "video" && (
				<video className='feed-picture' loop={true} preload='none' controls src={feed.posts}></video>
			)}
			{feed.type !== "video" && (
				<img alt={feed.posts} loading='lazy' className='feed-picture' src={feed.posts} />
			)}
		</div>
	);
}
