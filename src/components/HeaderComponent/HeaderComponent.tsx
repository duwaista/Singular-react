import React from "react";
import './HeaderStyle.css';
import { firebase } from "../../plugins/firebase";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/store";
import DrawerComponent from "../DrawerComponent/DrawerComponent";

export default function HeaderComponent () {

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
            <div className='header-title-text'>
                <b>Главная</b>
            </div>
            <div className={"header-scroll-top-button"} onClick={()=> scrollOnTop()}>
            </div>
            {/*{enter &&*/}
            {/*<div className={"header-logout-button"} onClick={logoutUser}>*/}

            {/*</div>*/}
            {/*}*/}
            <div onClick={() => openDrawer(true)} className={"header-menu-icon"}>
            </div>
        </header>
        <DrawerComponent/>
    </div>


}
