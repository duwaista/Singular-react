import React from "react";
import "./styles.css";
import { useTranslation } from "react-i18next";
import version from "../../../package.json";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

const About = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <HeaderComponent title="О проекте" icon />
      <div className="about-container">
        <div className="title-container">
          <span className="about-title center">Singular</span>
        </div>
        <div className="about-content ">
          <div className="about-content-block">
            <span>{t("version")}</span>
            <span>{version.version}</span>
          </div>
        </div>
        <div className="about-content">
          <div className="about-content-block">
            <span>{t("developer")}</span>
            <span>
              <a href="https://github.com/duwaista">duwaista</a>
            </span>
          </div>
        </div>
        <div className="about-content">
          <div className="about-content-block">
            <span>{t("source")}</span>
            <span>
              <a href="https://github.com/duwaista/Singular-react">GitHub</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
