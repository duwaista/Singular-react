import React, {useEffect} from "react";
import './DrawerStyle.css'
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/store";
import {Link} from "react-router-dom";
import {IUserState} from "../../types";

export default function DrawerComponent() {

    const drawer: boolean = useSelector(state => (state as any).boolshit.drawer);
    const logged: boolean = useSelector(state => (state as any).user.logged);
    const user: IUserState = useSelector(state => (state as any).user);
    const dispatch = useDispatch();

    function closeDrawer() {
        dispatch(actions.BoolShit.changeDrawer(false));
    }

    useEffect(() => {
        if (drawer) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [drawer]);

    function DrawerContent() {

        return <div className='drawer-content'>
            {logged && <div className='drawer-user-container'>
                {user.profile.photoURL &&
                <img alt='user avatar' className='drawer-avatar' src={user.profile.photoURL}/>
                }
                <span className='drawer-email'>
                    {user.profile.email}
                </span>
            </div>}
            {!logged && <div className='buttons-container'>
                <Link to='/sign-in' className='buttons'>
                    <span className='drawer-auth-text'>
                        Sign-in
                    </span>
                </Link>
                <Link to='/sign-up' className='buttons'>
                    <span className='drawer-auth-text'>
                        Sign-up
                    </span>
                </Link>
            </div>}
        </div>
    }

    return <div onClick={closeDrawer} className={`drawer ${drawer && "drawer-open"}`}>
        <DrawerContent/>
    </div>
}