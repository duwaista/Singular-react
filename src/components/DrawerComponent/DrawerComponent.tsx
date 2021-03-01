import React from "react";
import './DrawerStyle.css'
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/store";

export default function DrawerComponent() {

    const drawer: boolean = useSelector(state => (state as any).boolshit.drawer);
    const dispatch = useDispatch()

    function closeDrawer() {
        dispatch(actions.BoolShit.changeDrawer(false));
    }

    function DrawerContent() {
        return <div className='drawer-content'>
            <div className='buttons-container'>
                <div className='buttons'>
                    <span className='drawer-auth-text'>Sign-in</span>
                </div>
                <div className='buttons'>
                    <span className='drawer-auth-text'>Sign-up</span>
                </div>
            </div>

        </div>
    }
    return <div onClick={closeDrawer} className={`drawer ${drawer && "drawer-open"}`}>
        <DrawerContent/>
    </div>
}