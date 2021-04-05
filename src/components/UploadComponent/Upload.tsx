import React from "react";
import './UploadStyle.css'
import {useSelector} from "react-redux";
import CustomButton from "../BasicComponents/CustomButton/CustomButton";

export default function Upload() {

    const logged: boolean = useSelector(state => (state as any).user.logged);

    return <>
        {logged && <div className='upload-container'>
            <input accept='image/*, video/*' type='file' className='upload-input'/>
            <CustomButton height='30px' text={true}>
                Upload
            </CustomButton>
        </div>}
    </>
}