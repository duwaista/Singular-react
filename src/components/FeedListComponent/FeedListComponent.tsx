import React, {useEffect} from "react";
import './FeedListComponentStyle.css'
import FeedComponent from "../FeedComponent/FeedComponent";
import {FeedTypes} from '../../types'
import {useDispatch, useSelector} from "react-redux";
import {fetchFeed} from '../../store/store'


export const FeedListComponent = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchFeed())
    }, [dispatch])

    const all: FeedTypes[] = useSelector(state => (state as any).feed.all);

    return <div className={"feed-list-container"}>
        {all.map((feed:FeedTypes, index:number )=> <FeedComponent key={feed._id} index={index} feed={feed}/>)}
        <div>

        </div>
    </div>
}