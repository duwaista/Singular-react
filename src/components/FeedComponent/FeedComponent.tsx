import React, { useMemo } from "react";
import { actions } from "../../store/store";
import "./FeedComponentSyle.css";
import { useDispatch } from "react-redux";
import { FeedProps } from "../../types";
import dots from "../../assets/icons/dots-vertical.svg";
import avatar from "../../assets/icons/account-circle-outline.svg";

const FeedComponent = ({ index, feed, style }: FeedProps): JSX.Element => {
	const dispatch = useDispatch();

	const openBottom = (open: boolean) => {
		dispatch(actions.BoolShit.changeBottomMenu(open));
		dispatch(actions.Feed.setBottom({ index, feed }));
	}

	const openFullScreen = (open: boolean, picture: string) => {
		dispatch(actions.BoolShit.changeFullScreenDialog(open));
		dispatch(actions.Feed.setPicture(picture));
	}

	const feedContent = useMemo(() => {
		switch (feed.type) {
			case '':
			case 'image': {
				return (
					<img
						alt={feed.posts}
						loading='lazy'
						onClick={() => openFullScreen(true, feed.posts)}
						className='feed-picture'
						src={feed.posts}
					/>
				)
			}
			case 'video': {
				return (
					<video
						className='feed-picture'
						loop={true}
						preload='metadata'
						controls
						src={feed.posts}
					></video>
				)
			}
			default: {
				return (
					<img
						alt={feed.posts}
						loading='lazy'
						onClick={() => openFullScreen(true, feed.posts)}
						className='feed-picture'
						src={feed.posts}
					/>
				);
			}
		} 
	}, [feed]);

	return (
		<div className='feed-container' style={style}>
			<div className='feed-info-container'>
				<img
					alt={feed.avatarUrl || 'No avatar'}
					className='feed-avatar'
					src={feed.avatarUrl ? feed.avatarUrl : avatar}
				/>
				<div className='feed-email'>
					<b>{feed.email}</b>
				</div>
				<div
					className='icon dots-menu'
					onClick={() => openBottom(true)}
				>
					<img alt='icon' src={dots} />
				</div>
			</div>
			{feedContent}
		</div>
	);
}

export default FeedComponent;
