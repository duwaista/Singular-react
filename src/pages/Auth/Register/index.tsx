import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Redirect } from "react-router-dom";

import "../styles.css";
import HeaderComponent from "../../../components/HeaderComponent";
import CustomButton from "../../../common/CustomButton";
import useAppSelector from "../../../hooks/useAppSelector";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { fetchRegister } from "../../../store/user/asyncThunks";

const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const isLogged = useAppSelector((state) => state.user.isLogged);

  const register = () => {
    if (email && password.length >= 6 && password === confirm) {
      dispatch(fetchRegister({ email, password }));
    }
  };

  useEffect(() => {
    if (isLogged) {
      setEmail("");
      setPassword("");
      setConfirm("");
    }
  }, [isLogged]);

  return (
    <>
      {isLogged && <Redirect to="/" />}
      <HeaderComponent title="signUp" />
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
          <input
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            type="password"
            placeholder="Confirm password"
          />
          <CustomButton
            text
            disabled={!email || !password || !confirm}
            width="100%"
            height="34px"
            onClick={register}
          >
            {t("register")}
          </CustomButton>
          <span className="form-text-description">{t("haveAccount")}</span>
          <Link to="/sign-in">
            <CustomButton text width="100%" height="34px">
              {t("enter")}
            </CustomButton>
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
