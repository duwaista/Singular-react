import React from "react";
import "./DrawerStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { actions, AppState, logoutUserFetch } from "../../store/store";
import { Link } from "react-router-dom";
import avatar from "../../assets/icons/account-circle-outline.svg";
import about from "../../assets/icons/information-outline.svg";
import news from "../../assets/icons/newspaper-variant-outline.svg";
import logout from "../../assets/icons/logout.svg";
import translate from "../../assets/icons/translate.svg";
import { useTranslation } from "react-i18next";

export default function DrawerComponent(): JSX.Element {
	const drawer: boolean = useSelector(
		(state: AppState) => state.boolshit.drawer
	);
	const logged: boolean = useSelector((state: AppState) => state.user.logged);
	const user = useSelector((state: AppState) => state.user.profile);
	const [t, i18n] = useTranslation();
	const dispatch = useDispatch();

	function closeDrawer() {
		dispatch(actions.BoolShit.changeDrawer(false));
	}

	function selectLanguageHandler(event: any) {
		console.log(event.target.value);
		i18n.changeLanguage(event.target.value);
	}

	function fakeHandler(event: any) {
		event.cancelBubble = true;
		if (event.stopPropagation) event.stopPropagation();
	}

	function DrawerContent() {
		return (
			<div className="drawer-content">
				{logged && (
					<Link to={`user/${user.uid}`}>
						<div className="drawer-user-container drawer-item-container">
							{user.photoURL !== null ? (
								<img
									alt="user avatar"
									className="drawer-avatar"
									src={user.photoURL}
								/>
							) : (
								<img
									alt="user avatar"
									className="start-icon drawer-avatar"
									src={avatar}
								/>
							)}
							<span className="drawer-menu-text">{user.email}</span>
						</div>
					</Link>
				)}
				<Link to="/">
					<div className="drawer-item-container">
						<img alt="feed icon" className="start-icon icon" src={news} />
						<span className="drawer-menu-text">{t("home")}</span>
					</div>
				</Link>
				<Link className="drawer-item-container" to="/about">
					<img alt="about icon" className="start-icon icon" src={about} />
					<span className="drawer-menu-text">{t("about")}</span>
				</Link>

				{logged && (
					<div
						onClick={() => dispatch(logoutUserFetch())}
						className="drawer-item-container"
					>
						<img alt="feed icon" className="start-icon icon" src={logout} />
						<span className="drawer-menu-text">{t("logOut")}</span>
					</div>
				)}
				<div
					className="drawer-item-container"
					onClick={(event) => fakeHandler(event)}
				>
					<img alt="feed icon" className="start-icon icon" src={translate} />
					<select
						className="drawer-menu-text"
						onChange={(event) => selectLanguageHandler(event)}
					>
						<option className="drawer-select-hidden-item">
							{t("language")}
						</option>
						<option value="ru">Русский</option>
						<option value="en">English</option>
					</select>
				</div>
				{!logged && (
					<div className="buttons-container">
						<Link to="/sign-in" className="buttons">
							<span className="drawer-auth-text">{t("signIn")}</span>
						</Link>
						<Link to="/sign-up" className="buttons">
							<span className="drawer-auth-text">{t("signUp")}</span>
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
