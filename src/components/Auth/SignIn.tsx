import React, {useState} from "react";
import './Auth.css';
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import CustomButton from "../BasicComponents/CustomButton/CustomButton";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {actions, fetchLogin} from "../../store/store";

export default function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

     async function login() {
        if(email !== '' && password.length >= 6) {
            dispatch(fetchLogin({email, password}));
        }
    }

    return <>
        <HeaderComponent title='Вход'/>
        <div className='auth-container'>
            <form className='auth-form'>
                <input value={email} onChange={(event => setEmail(event.target.value))} type='email' placeholder='Email'/>
                <input value={password} onChange={(event => setPassword(event.target.value))} type='password' placeholder='Password'/>
                <CustomButton text={true} icon={false} width='100%' height='34px' onClick={login}>
                    Войти
                </CustomButton>
                <span className='form-text-description'>
                    Нет аккаунта?
                </span>
                <Link to='/sign-up'>
                    <CustomButton text={true} width='100%' height='34px'>
                        Зарегистрироваться
                    </CustomButton>
                </Link>
            </form>
        </div>
    </>
}