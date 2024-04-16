import React from "react";

import PhotoComponent from "../../components/ui/PhotoComponents/PhotoComponent";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {PhotoController, UserController} from "../../core/service-controllers";
import LinkComponent from "../../components/ui/LinkComponent/LinkComponent";
import {useAppContext, useUser} from "../../contexts/AppContextProvider";
import Navigation from "../../components/Navigation/Navigation";
import Container from "../../components/Container/Container";
import Curtain from "../../components/ui/Curtain/Curtain";
import Menu from "../../components/ui/Menu/Menu";
import {PageHeader} from "../../components/ui";
import {Photo} from "../../core/classes";

import './Profile.css'


/** компонент отбражает профиль пользователя  */
export function Profile() {
    const ctx = useAppContext()
    const user = useUser()
    const context = useAppContext()

    async function handlePhotoChange(blob:Blob){
        if(!user) return
        const photo = await Photo.fromFile(blob)
        await PhotoController.create(ctx, photo)

        user.photo = photo.id
        UserController.update(ctx, user)
            .then(() => context.setUser(user))
            .catch(defaultHandleError)
    }

    if(!user ) return null

    return (
        <div className='wrapper'>
            <div className='content hide-scroll'>
                <Container className='header-fixed'>
                    <PageHeader arrowBack MenuEl={<Menu/>}/>
                </Container>
                <div className='profile-backside column gap-1 pt-20'>
                    <div className='title title-bold center'>Профиль</div>
                    <div className='profile-image center'>
                        <PhotoComponent className='photo' item={user} onChange={handlePhotoChange} />
                    </div>
                    <div className='profile-user-name center'>
                        <span>{user.first_name}</span>&nbsp;
                        <span>{user.last_name}</span>
                    </div>
                </div>
                <Curtain minOffset={54} maxOpenPercent={.6} defaultOffsetPercents={.6}>
                    <Container className='column pt-20'>
                        <LinkComponent title='Настройки' to='/profile/settings/user/' arrow/>
                        <LinkComponent title='Действия' to='/profile/actions/' arrow/>
                        <LinkComponent title='Активные сеансы' to='/profile/sessions/' arrow/>
                    </Container>
                </Curtain>
            </div>
            <Navigation className='footer'/>
        </div>
    )
}