import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import "../styles.css";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import CustomButton from "../../../components/BasicComponents/CustomButton/CustomButton";
import { AppState, fetchLogin } from "../../../store/store";

const SignIn = (): JSX.Element => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const logged: boolean = useSelector((state: AppState) => state.user.logged);
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const login = () => {
		if (email !== "" && password.length >= 6) {
			dispatch(fetchLogin({ email, password }));
		}
	}

	useEffect(() => {
		if (logged) {
			setPassword("");
			setEmail("");
		}
	}, [logged]);

	return (
		<>
			{logged && <Redirect to="/" />}
			<HeaderComponent title="signIn" icon={true} />
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
						onClick={login}
					>
						{t("enter")}
					</CustomButton>
					<span className="form-text-description">{t("noAccount")}</span>
					<Link to="/sign-up">
						<CustomButton text width="100%" height="34px">
							{t("register")}
						</CustomButton>
					</Link>
				</form>
			</div>
		</>
	);
}

export default SignIn;
