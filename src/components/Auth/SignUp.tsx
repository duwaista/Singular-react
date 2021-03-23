import React from "react";
import './Auth.css';
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import CustomButton from "../BasicComponents/CustomButton/CustomButton";
import {Link} from "react-router-dom";

export default function SignUp() {

    function register() {

    }

    return <>
        <HeaderComponent title='Регистрация' />
        <div className='auth-container'>
            <form className='auth-form'>
                <input type='email' placeholder='Email'/>
                <input type='password' placeholder='Password'/>
                <input type='password' placeholder='Confirm password'/>
                <CustomButton text={true} icon={false} width='100%' height='34px' onClick={register}>
                    Зарегистрироваться
                </CustomButton>
                <span className='form-text-description'>
                    Уже есть аккаунт?
                </span>
                <Link to='/sign-in'>
                    <CustomButton text={true} width='100%' height='34px'>
                        Войти
                    </CustomButton>
                </Link>
            </form>
        </div>
    </>
}