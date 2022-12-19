import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./style.css";
import DrawerItem from "./components/DrawerItem";
import useAppSelector from "../../hooks/useAppSelector";
import useAppDispatch from "../../hooks/useAppDispatch";
import { setShowAppDrawer } from "../../store/app";
import { fetchLogout } from "../../store/user/asyncThunks";

import avatar from "../../assets/icons/account-circle-outline.svg";
import about from "../../assets/icons/information-outline.svg";
import news from "../../assets/icons/newspaper-variant-outline.svg";
import logout from "../../assets/icons/logout.svg";
import translate from "../../assets/icons/translate.svg";

const Drawer = (): JSX.Element => {
  const drawer = useAppSelector((state) => state.app.showDrawer);
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const user = useAppSelector((state) => state.user.profile);

  const [t, i18n] = useTranslation();
  const dispatch = useAppDispatch();

  const closeDrawer = () => {
    dispatch(setShowAppDrawer(false));
  };

  const selectLanguageHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!event.target?.value) return;
    i18n.changeLanguage(event.target.value);
  };

  const fakeHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  };

  return (
    <div
      className={`drawer ${drawer ? "drawer-open" : ""}`}
      onClick={closeDrawer}
    >
      <div className="drawer-content">
        {isLogged && (
          <Link to={`/user/${user?.uid}`}>
            <div className="drawer-user-container drawer-item-container">
              <img
                alt="user avatar"
                className="drawer-avatar"
                src={user?.photoURL || avatar}
              />
              <span className="drawer-menu-text">{user?.email}</span>
            </div>
          </Link>
        )}
        <DrawerItem linkTo="/">
          <img
            alt="feed icon"
            className="start-icon icon"
            src={news}
          />
          <span className="drawer-menu-text">
            {t("home")}
          </span>
        </DrawerItem>
        <DrawerItem linkTo="/about">
          <img
            alt="about icon"
            className="start-icon icon"
            src={about}
          />
          <span className="drawer-menu-text">
            {t("about")}
          </span>
        </DrawerItem>
        {isLogged && (
          <DrawerItem onClick={() => dispatch(fetchLogout())}>
            <img
              alt="feed icon"
              className="start-icon icon"
              src={logout}
            />
            <span className="drawer-menu-text">
              {t("logOut")}
            </span>
          </DrawerItem>
        )}
        <DrawerItem onClick={(e) => fakeHandler(e)}>
          <img alt="feed icon" className="start-icon icon" src={translate} />
          <select
            className="drawer-menu-text"
            onChange={(event) => selectLanguageHandler(event)}
          >
            <option className="drawer-select-hidden-item">{t("language")}</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </DrawerItem>
        {!isLogged && (
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
    </div>
  );
};

export default Drawer;
