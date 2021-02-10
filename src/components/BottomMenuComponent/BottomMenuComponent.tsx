import React from "react";
import './BottomMenuStyle.css';
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/store";
import BasicElementBottom from "../BasicComponents/BasicElementBottom/BasicElementBottom";
import deleteIcon from '../../assets/icons/delete.svg'
import share from '../../assets/icons/share-variant.svg'
import {FeedTypes} from "../../types";

export default function BottomMenuComponent() {

    const dispatch = useDispatch();
    const bottom: boolean = useSelector(state => (state as any).boolshit.bottomMenu);
    const feed: FeedTypes = useSelector(state => (state as any).feed.bottom);

    function closeBottomMenu() {
        dispatch(actions.BoolShit.changeBottomMenu(false));
    }

    async function sharePic() {
        const shareData = {
            title: "MDN",
            text: 'Share',
            url: feed.posts
        }
        try {
            await navigator.share(shareData);
        }
        catch (err) {
            console.log(err);
        }
    }

    return <div onClick={closeBottomMenu} className={`bottom-menu ${bottom && 'bottom-menu-open'}`}>
        {bottom && <div className={"bottom-menu-content"}>
            <div className={"bottom-line-container"}>
                <div className={"small-button-line"}>
                </div>
            </div>
            <BasicElementBottom onClick={closeBottomMenu} text="Delete (doesn't work)" icon={deleteIcon}/>
            <BasicElementBottom onClick={sharePic} text='Share (HTTPS only)' icon={share}/>
        </div>
        }
    </div>
}
