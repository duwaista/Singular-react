import React, {useEffect} from "react";
import './UploadStyle.css'
import {ReactComponent as Plus} from "../../assets/icons/plus.svg";
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../store/store";
import plus from '../../assets/icons/plus.svg';

export default function Upload() {

    const open: boolean = useSelector(state => (state as any).boolshit.uploadMenu);
    const dispatch = useDispatch();

    function changeOpen(o: boolean) {
        dispatch(actions.BoolShit.changeUploadMenu(o));
    }

    useEffect(() => {
        if (!open) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
    }, [open]);

    return <>
        {!open && <div className='upload-button' onClick={() => changeOpen(true)}>
            <Plus fill='white' className='plus-icon'/>
        </div>}
        {open && <div onClick={() => changeOpen(false)} className='upload-content-container'>
            <div className='upload-content'>
                <input className='upload-file-input' type='file'/>
                <img onClick={() => changeOpen(false)} alt='close-icon' src={plus} className='close-icon'/>
            </div>
        </div>}
    </>
}