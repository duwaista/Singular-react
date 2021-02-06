import React from "react";
import './BasicElementBottomStyle.css';
import {BasicElementProps} from '../../../types'

export default function BasicElementBottom({ text, icon}: BasicElementProps) {
    return <div className={"basic-element-bottom-container"}>
        <img className={"basic-element-icon"} src={icon}/>
        <span>
            {text}
        </span>

    </div>
}