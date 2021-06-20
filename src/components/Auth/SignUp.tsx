import React, { useEffect, useState } from "react";
import "./Auth.css";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import CustomButton from "../BasicComponents/CustomButton/CustomButton";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState, fetchRegister } from "../../store/store";

export default function SignUp(): JSX.Element {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const logged: boolean = useSelector((state: AppState) => state.user.logged);
	const dispatch = useDispatch();

	function register() {
		if (email !== "" && password.length >= 6 && password === confirm) {
			dispatch(fetchRegister({ email, password }));
		}
	}

	useEffect(() => {
		if (logged) {
			setEmail("");
			setPassword("");
			setConfirm("");
		}
	}, [logged]);

	return (
		<>
			<HeaderComponent title='Регистрация' icon={true}/>
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
					<input
						value={confirm}
						onChange={(event) => setConfirm(event.target.value)}
						type='password'
						placeholder='Confirm password'
					/>
					<CustomButton
						text={true}
						icon={false}
						width='100%'
						height='34px'
						onClick={register}
					>
						Зарегистрироваться
					</CustomButton>
					<span className='form-text-description'>Уже есть аккаунт?</span>
					<Link to='/sign-in'>
						<CustomButton text={true} width='100%' height='34px'>
							Войти
						</CustomButton>
					</Link>
					{logged && <Redirect to='/'></Redirect>}
				</form>
			</div>
		</>
	);
}
