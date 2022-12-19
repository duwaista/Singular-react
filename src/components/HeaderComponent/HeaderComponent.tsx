import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import "./HeaderStyle.css";
import { actions } from "../../store/store";
import Drawer from "../DrawerComponent";
import { HeaderProps } from "../../types";
import menu from "../../assets/icons/menu.svg";
import useAppDispatch from "../../hooks/useAppDispatch";
import { setShowAppDrawer } from "../../store/app";

const HeaderComponent = ({ title, icon }: HeaderProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const openDrawer = (isOpen: boolean) => {
    dispatch(setShowAppDrawer(isOpen));
  };

  const scrollOnTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  return (
    <>
      <header className="header">
        <div onClick={() => scrollOnTop()} className="header-title-text">
          <b>{t(title)}</b>
        </div>
        <div className="header-scroll-top-button" onClick={() => scrollOnTop()} />
        {icon && (
          <div onClick={() => openDrawer(true)} className="icon header-menu">
            <img alt="icon" src={menu} />
          </div>
        )}
      </header>
      <Drawer />
      <div className="spacer-up" />
    </>
  );
};

export default HeaderComponent;
