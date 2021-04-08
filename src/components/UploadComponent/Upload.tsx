import React, {useState} from "react";
import './UploadStyle.css'
import {useSelector} from "react-redux";
import CustomButton from "../BasicComponents/CustomButton/CustomButton";
import {storage} from "../../plugins/firebase";
import axios from "axios";
import {url} from "../../store/store";
import {IUserState} from "../../types";

export default function Upload() {

    const logged: boolean = useSelector(state => (state as any).user.logged);
    const user: IUserState = useSelector(state => (state as any).user.profile);
    const [file, setFile] = useState<File>();
    const [path, setPath] = useState('');

    function changeHandler(event: any) {
        setFile(event.target.files[0]);
        console.log(file);
    }

    async function addFile() {
        const maxImageSize: number = 5 * 1024 * 1024;
        const maxVideoSize: number = 20 * 1024 * 1024;
        const fileRef = storage.ref();

        if (file) {
            const uploadFile = fileRef.child(path + file.name);

            if (file.type.indexOf('image/') === 0 && file.size <= maxImageSize) {
                setPath('images/');
                console.log(path);

                await uploadFile.put(file)
                    .then(async () => {
                        const URL = await uploadFile.getDownloadURL();
                        await mongoAddFile(URL, 'image').then(() => setFile([] as any))
                            .then(async () => await mongoAddFile(URL, 'video').then(() => setFile([] as any)));
                    })
                    .catch(error => {
                        console.log(error)
                    })

            } else if (file.type.indexOf('video/') === 0 && file.size <= maxVideoSize) {
                setPath('videos/');
                console.log(path);

                await uploadFile.put(file)
                    .then(async () => {
                        const URL:any = await uploadFile.getDownloadURL()
                            .then(async () => await mongoAddFile(URL, 'video').then(() => setFile([] as any)));

                    })
                    .catch(error => {
                        console.log(error)
                    })

            } else {
                console.log("What");
            }
        } else {
            console.log('Die');
        }
    }

    async function mongoAddFile(URL: string, type: string) {

        console.log("Posted " ,URL, type)

        await axios.post(url, {
            avatarUrl: user.profile.photoURL,
            email: user.profile.email,
            uid: user.profile.uid,
            posts: URL,
            type: type,
            createdAt: new Date().toString()
        })
            .then(() => {
                console.log("Success", URL, type)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return <>
        {logged && <div className='upload-container'>
            <input accept='image/*, video/*'
                   type='file'
                   onChange={(e) => changeHandler(e)}
                   className='upload-input'
            />
            <CustomButton onClick={() => addFile()} height='30px' text={true}>
                Upload
            </CustomButton>
        </div>}
    </>
}