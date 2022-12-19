import React from "react";
import { useTranslation } from "react-i18next";

import "./style.css";
import Drawer from "../DrawerComponent";
import useAppDispatch from "../../hooks/useAppDispatch";
import { setShowAppDrawer } from "../../store/app";

import menu from "../../assets/icons/menu.svg";

type Props = {
  title: string;
  showDrawer?: boolean;
};

const HeaderComponent = ({ title, showDrawer }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const openDrawer = (isOpen: boolean) => {
    dispatch(setShowAppDrawer(isOpen));
  };

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  return (
    <>
      <header className="header">
        <div
          className="header-title-text"
          onClick={() => scrollToTop()}
        >
          <b>{t(title)}</b>
        </div>
        <div
          className="header-scroll-top-button"
          onClick={() => scrollToTop()}
        />
        {showDrawer && (
          <div onClick={() => openDrawer(true)} className="icon header-menu">
            <img alt="icon" src={menu} />
          </div>
        )}
      </header>
      {showDrawer && <Drawer />}
      <div className="spacer-up" />
    </>
  );
};

export default HeaderComponent;
