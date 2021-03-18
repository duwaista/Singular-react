import React from "react";
import './SignInStyle.css';
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import CustomButton from "../BasicComponents/CustomButton/CustomButton";
import {Link} from "react-router-dom";

export default function SignIn() {


    function a() {
        alert("sdsadqrfvwjht")
    }

    return <>
        <HeaderComponent title='Вход'/>
        <div className='sign-in-container'>
            <form className='sign-in-form'>
                <input type='email' placeholder='Email'/>
                <input type='password' placeholder='Password'/>

                <CustomButton text={true} icon={false} width='100%' height='34px' onClick={a}>
                    Войти
                </CustomButton>
                <Link to='/sign-up'>
                    <CustomButton text={true} width='100%' height='34px'>
                        Зарегистрироваться
                    </CustomButton>
                </Link>
            </form>
        </div>
    </>
}