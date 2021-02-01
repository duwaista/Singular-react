import React from "react";
import {actions} from "../../store/store";
import './FeedComponentSyle.css';
import {useDispatch} from "react-redux";
import {FeedProps} from '../../types'

export default function FeedComponent( {index, feed}: FeedProps) {

    const dispatch = useDispatch();
    dispatch(actions.Feed.getData);

    return <div className={"feed-container"}>
        <div className={"feed-info-container"}>
            <img className={"feed-avatar"} src={feed.avatarUrl}/>
            <h3 className={"feed-email"}>
                {feed.email}
            </h3>
        </div>
        <img className={"feed-picture"} src={feed.posts}/>
    </div>
}