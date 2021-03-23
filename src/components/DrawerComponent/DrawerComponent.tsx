import React from "react";
import './DrawerStyle.css'
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/store";
import {Link} from "react-router-dom";

export default function DrawerComponent() {

    const drawer: boolean = useSelector(state => (state as any).boolshit.drawer);
    const dispatch = useDispatch()

    function closeDrawer() {
        dispatch(actions.BoolShit.changeDrawer(false));
    }

    function DrawerContent() {

        if (drawer) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return <div className='drawer-content'>
            <div className='buttons-container'>
                <Link to='/sign-in'>
                    <div className='buttons'>
                        <span className='drawer-auth-text'>
                            Sign-in
                        </span>
                    </div>
                </Link>
                <Link to='/sign-up'>
                    <div className='buttons'>
                        <span className='drawer-auth-text'>Sign-up</span>
                    </div>
                </Link>

            </div>

        </div>
    }

    return <div onClick={closeDrawer} className={`drawer ${drawer && "drawer-open"}`}>
        <DrawerContent/>
    </div>
}