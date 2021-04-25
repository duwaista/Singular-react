import React, { useEffect } from "react";
import "./DrawerStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/store";
import { Link } from "react-router-dom";
import { IUserState } from "../../types";
import avatar from "../../assets/icons/account-circle-outline.svg";
import about from "../../assets/icons/information-outline.svg";
import news from "../../assets/icons/newspaper-variant-outline.svg";

export default function DrawerComponent() {
	const drawer: boolean = useSelector((state) => (state as any).boolshit.drawer);
	const logged: boolean = useSelector((state) => (state as any).user.logged);
	const user: IUserState = useSelector((state) => (state as any).user);
	const dispatch = useDispatch();

	function closeDrawer() {
		dispatch(actions.BoolShit.changeDrawer(false));
	}

	useEffect(() => {
		if (drawer) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [drawer]);

	function DrawerContent() {
		return (
			<div className='drawer-content'>
				{logged && (
					<div className='drawer-user-container drawer-item-container'>
						{user.profile.photoURL !== null ? (
							<img
								alt='user avatar'
								className='drawer-avatar'
								src={user.profile.photoURL}
							/>
						) : (
							<img
								alt='user avatar'
								className='start-icon drawer-avatar'
								src={avatar}
							/>
						)}
						<span className='drawer-menu-text'>{user.profile.email}</span>
					</div>
				)}
				<Link to='/'>
					<div className='drawer-item-container'>
						<img alt='feed icon' className='start-icon icon' src={news} />
						<span className='drawer-menu-text'>Главная</span>
					</div>
				</Link>
				<Link className='drawer-item-container' to='/about'>
					<img alt='about icon' className='start-icon icon' src={about} />
					<span className='drawer-menu-text'>О проекте</span>
				</Link>
				{!logged && (
					<div className='buttons-container'>
						<Link to='/sign-in' className='buttons'>
							<span className='drawer-auth-text'>Sign-in</span>
						</Link>
						<Link to='/sign-up' className='buttons'>
							<span className='drawer-auth-text'>Sign-up</span>
						</Link>
					</div>
				)}
			</div>
		);
	}

	return (
		<div onClick={closeDrawer} className={`drawer ${drawer && "drawer-open"}`}>
			<DrawerContent />
		</div>
	);
}
