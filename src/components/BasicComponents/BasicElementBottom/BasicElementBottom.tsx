import React from "react";
import './BasicElementBottomStyle.css';


type BasicElementProps = {
    text: string;
    icon: string
}

export default function BasicElementBottom({ text, icon }: BasicElementProps) {
    return <div className={"basic-element-bottom-container"}>
        <img className={"basic-element-image"} src={icon}/>
        <span>
            {text}
        </span>
    </div>
}