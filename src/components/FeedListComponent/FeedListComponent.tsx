import React, {useEffect, useMemo} from "react";
import './FeedListComponentStyle.css'
import FeedComponent from "../FeedComponent/FeedComponent";
import {FeedTypes} from '../../types'
import {useDispatch, useSelector} from "react-redux";
import {fetchFeed} from '../../store/store'

export function FeedListComponent() {

    const dispatch = useDispatch();
    const all:FeedTypes[] = useSelector(state => (state as any).feed.all);

    useEffect(()=>{
        dispatch(fetchFeed());
    }, []);

    return <div className={"feed-list-container"}>
        {
            useMemo(() => {
                return all.map((feed:FeedTypes, index:number )=> <FeedComponent key={feed._id} index={index} feed={feed}/>)
            }, [all])
        }
    </div>
}