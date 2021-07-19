import React, { useEffect, useState } from "react";
import "./Auth.css";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import CustomButton from "../BasicComponents/CustomButton/CustomButton";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState, fetchLogin } from "../../store/store";

export default function SignIn(): JSX.Element {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const logged: boolean = useSelector((state: AppState) => state.user.logged);
	const dispatch = useDispatch();

	function login() {
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
			<HeaderComponent title='Вход' icon={true} />
			<div className='auth-container'>
				<form className='auth-form'>
					<input
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						type='email'
						placeholder='Email'
					/>
					<input
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						type='password'
						placeholder='Password'
					/>
					<CustomButton
						text={true}
						icon={false}
						width='100%'
						height='34px'
						onClick={login}
					>
						Войти
					</CustomButton>
					<span className='form-text-description'>Нет аккаунта?</span>
					<Link to='/sign-up'>
						<CustomButton text={true} width='100%' height='34px'>
							Зарегистрироваться
						</CustomButton>
					</Link>
					{logged && <Redirect to='/'></Redirect>}
				</form>
			</div>
		</>
	);
}
