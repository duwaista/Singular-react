import React from "react";
import "./HeaderStyle.css";
import { useDispatch } from "react-redux";
import { actions } from "../../store/store";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { HeaderProps } from "../../types";
import menu from "../../assets/icons/menu.svg";
import { useTranslation } from "react-i18next";

const HeaderComponent = ({ title, icon }: HeaderProps): JSX.Element => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const openDrawer = (drawer: boolean) => {
		dispatch(actions.BoolShit.changeDrawer(drawer));
	}

	const scrollOnTop = () => {
		window.scroll({
			top: 0,
			left: 0,
		});
	}

	return (
		<div>
			<header className={"header"}>
				<div onClick={() => scrollOnTop()} className='header-title-text'>
					<b>{t(title)}</b>
				</div>
				<div className={"header-scroll-top-button"} onClick={() => scrollOnTop()}></div>
				{icon && (
					<div onClick={() => openDrawer(true)} className={"icon header-menu"}>
						<img alt='icon' src={menu} />
					</div>
				)}
			</header>
			<DrawerComponent />
			<div className='spacer-up'></div>
		</div>
	);
}

export default HeaderComponent;
