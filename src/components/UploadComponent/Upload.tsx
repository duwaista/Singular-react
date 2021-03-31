import React from "react";
import './UploadStyle.css'
import {ReactComponent as Plus} from "../../assets/icons/plus.svg";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/store";

export default function Upload() {

    const open: boolean = useSelector(state => (state as any).boolshit.uploadMenu);
    const dispatch = useDispatch();

    function changeOpen(o: boolean) {
        dispatch(actions.BoolShit.changeUploadMenu(o));
    }

    return <>
        {!open && <div className='upload-button-container'>
            <div className='upload-button' onClick={() => changeOpen(true)}>
                <Plus fill='white' className='plus-icon'/>
            </div>
        </div>}
        {open && <div className='upload-content-container'>
            <div className='upload-content'>
                <input type='file'/>
                <input type='file'/>
            </div>
        </div>}
    </>
}