import React from "react";
import './BottomMenuStyle.css';
import BottomMenuContent from "./BottomMenuContent";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/store";

export default function BottomMenuComponent() {

    const dispatch = useDispatch();
    const bottom: boolean = useSelector(state => (state as any).boolshit.bottomMenu);

    function closeBottomMenu() {
        dispatch(actions.BoolShit.changeBottomMenu(false));
    }

    return <div onClick={closeBottomMenu} className={`bottom-menu ${ bottom && 'bottom-menu-open' }`}>
        {bottom && <BottomMenuContent/>
        }
    </div>
}
