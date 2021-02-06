import React from "react";
import './BottomMenuStyle.css';
import BottomMenuContent from "./BottomMenuContent";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/store";
import {BottomChildProps} from "../../types";

export default function BottomMenuComponent({children}: BottomChildProps) {

    const dispatch = useDispatch();
    const bottom: boolean = useSelector(state => (state as any).boolshit.bottomMenu);

    function closeBottomMenu() {
        dispatch(actions.BoolShit.changeBottomMenu(false));
    }

    return <div onClick={closeBottomMenu} className={`bottom-menu ${ bottom && 'bottom-menu-open' }`}>
        {bottom && <div className={"bottom-menu-content"}>
            <div className={"bottom-line-container"}>
                <div className={"small-button-line"}>
                </div>
            </div>
            {children}
        </div>
        }
    </div>
}
