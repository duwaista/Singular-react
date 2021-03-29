import React from "react";
import './AboutStyle.css'
import version from '../../../package.json';
import HeaderComponent from "../HeaderComponent/HeaderComponent";

export default function About() {
    return <>
        <HeaderComponent title='О проекте' icon={true}/>
        <div className='about-container'>
            <div className='title-container'>
            <span className='about-title center'>
            Singular
        </span>
            </div>
            <div className='about-content center'>
                <div className='about-content-block'>
                <span>
                    Версия
                </span>
                    <span>
                    {version.version}
                </span>
                </div>
            </div>
            <div className='about-content center'>
                <div className='about-content-block'>
                <span>
                    Разработчик
                </span>
                    <span>
                    duwaista
                </span>
                </div>
            </div>
        </div>
    </>
}