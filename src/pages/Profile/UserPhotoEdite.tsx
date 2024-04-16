import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import PhotoComponent from "../../components/ui/PhotoComponents/PhotoComponent";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext, useUser} from "../../contexts/AppContextProvider";
import {PhotoController} from "../../core/service-controllers";
import Container from "../../components/Container/Container";
import Button from "../../components/ui/Button/Button";
import {Photo, User} from "../../core/classes";
import {PageHeader} from "../../components/ui";


/**
 *
 */
export function UserPhotoEdite() {
    const ctx_user = useUser()!
    const ctx = useAppContext()
    const [photo, setPhoto] = useState<Photo>()
    const [user, setUser] = useState<User>()
    const navigate = useNavigate()


    useEffect(() => { if (ctx_user) setUser(new User(ctx_user))}, [])


    async function handlePhotoChange(blob: Blob) {
        if (!user) return
        const photo = await Photo.fromFile(blob)
        setPhoto(photo)

    }


    function handleSave() {
        if (!user || !photo) return

        PhotoController.create(ctx, photo)
            .then(() => {
                user.photo = photo.id
                ctx.setUser(user)
            })
            .then(() => navigate('/profile/'))
            .catch(defaultHandleError)
    }

    if(!user) return null


    return (
        <div className='wrapper'>
            <Container className='content'>
                <PageHeader arrowBack/>
                <div className='column center gap-1 pt-20'>
                    <PhotoComponent className='photo' item={user} onChange={handlePhotoChange}/>
                </div>
            </Container>
            <div className='footer-btn-container footer'>
                <Button onClick={handleSave} disabled={!Boolean(photo)}>Сохранить</Button>
            </div>
        </div>
    )
}
