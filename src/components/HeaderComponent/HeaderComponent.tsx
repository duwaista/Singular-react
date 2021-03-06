import React from "react";
import './HeaderStyle.css';
import { firebase } from "../../plugins/firebase";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/store";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import {HeaderTitle} from "../../types";

export default function HeaderComponent ({title}: HeaderTitle) {

    const dispatch = useDispatch();
    const enter: boolean = useSelector(state => (state as any).boolshit.logged)

    async function logoutUser() {
        await firebase.auth().signOut()
            .then(() => {
                dispatch(actions.BoolShit.enterChanges(false));
            })
    }

    function openDrawer(drawer: boolean) {
        dispatch(actions.BoolShit.changeDrawer(drawer));
    }

    function scrollOnTop() {
        window.scroll({
            top: 0,
            left: 0,
        })
    }
    
    return <div>
        <header className={"header"} >
            <div onClick={()=> scrollOnTop()} className='header-title-text'>
                <b>{title}</b>
            </div>
            <div className={"header-scroll-top-button"} onClick={()=> scrollOnTop()}>
            </div>
            {/*{enter &&*/}
            {/*<div className={"header-logout-button"} onClick={logoutUser}>*/}

            {/*</div>*/}
            {/*}*/}
            <div onClick={() => openDrawer(true)} className={"icon header-menu"}>
            </div>
        </header>
        <DrawerComponent/>
    </div>


}
