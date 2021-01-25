import React from "react";
import './HeaderStyle.css';
import { firebase } from "../../plugins/firebase";
import{ useDispatch } from "react-redux";
import { actions } from "../../store/store";

export default function HeaderComponent () {

    const dispatch = useDispatch();

    async function logoutUser() {
        await firebase.auth().signOut()
            .then(() => {
                dispatch(actions.enterChanges(false));
            })
    }

    function openDrawer(drawer: boolean) {
        dispatch(actions.changeDrawer(drawer));
    }

    return <header className={"header"}>
        <div onClick={() => openDrawer(true)} className={"header-menu-icon"}>

        </div>
        <button className={"header-logout-button"} onClick={logoutUser}>
            X
        </button>
    </header>
}
