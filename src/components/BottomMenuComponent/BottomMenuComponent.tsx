import React from "react";
import './BottomMenuStyle.css';
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/store";

export default function BottomMenuComponent() {

    const dispatch = useDispatch();
    const bottom: boolean = useSelector(state => (state as any).boolshit.bottomMenu);

    function closeBottomMenu() {
        dispatch(actions.changeBottomMenu(false));
    }

    function BasicElementBottom() {
        return <div className={"basic-element-bottom-container"}>
            <span>
                
            </span>
        </div>
    }

    function BottomMenuContent() {
        return <div className={"bottom-menu-content"}>
            <div className={"bottom-line-container"}>
                <div className={"small-button-line"}>
                </div>
            </div>
            <BasicElementBottom/>
        </div>
    }

    return <div onClick={closeBottomMenu} className={`bottom-menu ${ bottom && 'bottom-menu-open' }`}>
        {bottom && <BottomMenuContent/>

        }
    </div>
}
