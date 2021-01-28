import React from "react";
import './BottomMenuStyle.css';
import BasicElementBottom from '../BasicComponents/BasicElementBottom/BasicElementBottom'
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/store";
import menu from '../../assets/icons/menu.svg'
import login from '../../assets/icons/login.svg'

export default function BottomMenuComponent() {

    const dispatch = useDispatch();
    const bottom: boolean = useSelector(state => (state as any).boolshit.bottomMenu);

    function closeBottomMenu() {
        dispatch(actions.changeBottomMenu(false));
    }

    function BottomMenuContent() {
        return <div className={"bottom-menu-content"}>
            <div className={"bottom-line-container"}>
                <div className={"small-button-line"}>
                </div>
            </div>
            <BasicElementBottom text={"orororo"} icon={menu}/>
            <BasicElementBottom text={"wewewewe"} icon={login}/>
        </div>
    }

    return <div onClick={closeBottomMenu} className={`bottom-menu ${ bottom && 'bottom-menu-open' }`}>
        {bottom && <BottomMenuContent/>

        }
    </div>
}
