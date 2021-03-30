import React, {useEffect, useMemo, Suspense} from "react";
import './FeedListComponentStyle.css'
import {FeedTypes} from '../../types'
import {useDispatch, useSelector} from "react-redux";
import {fetchFeed} from '../../store/store'
import Loading from "../BasicComponents/LoadingBar/LoadingBarComponent";
const FeedComponent = React.lazy(()=> import("../FeedComponent/FeedComponent"));

export function FeedListComponent() {

    const dispatch = useDispatch();
    const all: FeedTypes[] = useSelector(state => (state as any).feed.all);

    useEffect(() => {
        dispatch(fetchFeed());
    }, [dispatch]);

    return <Suspense fallback={<Loading/>}>
        <div className={"feed-list-container"}>
            {
                useMemo(() => {
                    return all.map((feed: FeedTypes, index: number) => <FeedComponent key={feed._id} index={index} feed={feed}/>)
                }, [all])
            }
        </div>
    </Suspense>

}