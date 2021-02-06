import React from "react";
import {actions} from "../../store/store";
import './FeedComponentSyle.css';
import {useDispatch} from "react-redux";
import {FeedProps} from '../../types'
import dots from '../../assets/icons/dots-vertical.svg'
import BottomMenuContent from "../BottomMenuComponent/BottomMenuContent";
import BasicElementBottom from "../BasicComponents/BasicElementBottom/BasicElementBottom";
import BottomMenuComponent from "../BottomMenuComponent/BottomMenuComponent";

export default function FeedComponent( {index, feed}: FeedProps) {

    const dispatch = useDispatch();
    dispatch(actions.Feed.getData);

    function openBottom(s: boolean) {
        dispatch(actions.BoolShit.changeBottomMenu(s));

        return <BottomMenuComponent>
            <BasicElementBottom text={"test"} icon={dots}/>
        </BottomMenuComponent>
    }

    return <div className={"feed-container"}>
        <div className={"feed-info-container"}>
            <img className={"feed-avatar"} src={feed.avatarUrl}/>
            <h3 className={"feed-email"}>
                {feed.email}
            </h3>
            <div className={"dots-menu-icon"} onClick={()=>{openBottom(true)}}>
                <img src={dots}/>
            </div>
        </div>
        <img className={"feed-picture"} src={feed.posts}/>
    </div>
}