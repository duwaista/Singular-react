import React from "react";
import BasicElementBottom from "../BasicComponents/BasicElementBottom/BasicElementBottom";
import login from "../../assets/icons/login.svg";
import trash from "../../assets/icons/delete.svg"

export default function BottomMenuContent() {

    return <div className={"bottom-menu-content"}>
        <div className={"bottom-line-container"}>
            <div className={"small-button-line"}>
            </div>
        </div>
        <BasicElementBottom text={"Delete (doesn't work)"} icon={trash}/>
        <BasicElementBottom text={"wewewewe"} icon={login}/>
    </div>
}