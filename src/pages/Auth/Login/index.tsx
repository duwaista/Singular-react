import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Redirect } from "react-router-dom";

import "../styles.css";
import HeaderComponent from "../../../components/HeaderComponent";
import CustomButton from "../../../common/CustomButton";
import useAppSelector from "../../../hooks/useAppSelector";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { fetchLogin } from "../../../store/user/asyncThunks";

const SignIn = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isLogged = useAppSelector((state) => state.user.isLogged);

  const login = () => {
    if (email !== "" && password.length >= 6) {
      dispatch(fetchLogin({ email, password }));
    }
  };

  useEffect(() => {
    if (isLogged) {
      setPassword("");
      setEmail("");
    }
  }, [isLogged]);

  return (
    <>
      {isLogged && <Redirect to="/" />}
      <HeaderComponent title="signIn" />
      <div className="auth-container">
        <form className="auth-form">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
          />
          <CustomButton
            text
            width="100%"
            height="34px"
            disabled={!email || !password}
            onClick={login}
          >
            {t("enter")}
          </CustomButton>
          <span className="form-text-description">{t("noAccount")}</span>
          <Link to="/sign-up">
            <CustomButton
              text
              width="100%"
              height="34px"
            >
              {t("register")}
            </CustomButton>
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignIn;
