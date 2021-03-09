import React from "react";
import './SignInStyle.css';
import HeaderComponent from "../HeaderComponent/HeaderComponent";

export default function SignIn() {

    return <>
        <HeaderComponent title='Вход'/>
        <div className='sign-in-container'>
            <form className='sign-in-form'>
                <input placeholder='Email'/>
                <input placeholder='Password'/>
                <div className='sign-in-button'>
                    <span>
                        Войти
                    </span>
                </div>
            </form>
        </div>
    </>
}