import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext} from "../../contexts/AppContextProvider";
import {UserController} from "../../core/service-controllers";
import Container from "../../components/Container/Container";
import Button from "../../components/ui/Button/Button";
import {Input, PageHeader} from "../../components/ui";
import {User} from "../../core/classes";
import {useUser} from "../../hooks/redux-hooks";



/**
 * компонент редактирования иформации пользователя
 * @function
 * @name UserNameEdite
 * @returns {JSX.Element}
 * @category Pages
 */
export function UserNameEdite() {
    const ctx = useAppContext()
    const {user: ctx_user} = useUser()
    const context = useAppContext()
    const navigate = useNavigate()
    const [user, setUser] = useState<User>()
    const [userChange, setUserChange] = useState(false)

    useEffect(() => { if(ctx_user) setUser(ctx_user) }, [])


    function handleFirstName(firstName: string) {
        if (!user) return
        user.first_name =  firstName
        if(!userChange) setUserChange(true)
        setUser({...user})
    }


    function handleLastName(lastName: string) {
        if (!user) return
        user.last_name = lastName
        if(!userChange) setUserChange(true)
        setUser({...user})
    }


    function handleUserName(userName: string) {
        if (!user) return
        user.username = userName
        if(!userChange) setUserChange(true)
        setUser({...user})
    }


    /** сохранение изменений в инфо о пользователе */
    function handleSave() {
        if (!user || !userChange) return
        UserController.update(ctx, user)
            .then(() => context.setUser(user))
            .then(() => navigate('/profile/'))
            .catch(defaultHandleError)
    }


    if (!user) return null

    return (
        <div className='wrapper'>
            <Container className='content'>
                <PageHeader arrowBack/>
                <div className='column gap-1'>
                    <div>
                        <div className='title-semi-bold'>Имя</div>
                        <Input value={user.first_name} placeholder='Имя' onChange={handleFirstName}/></div>
                    <div>
                        <div className='title-semi-bold'>Фамилия</div>
                        <Input value={user.last_name} placeholder='Фамилия' onChange={handleLastName}/>
                    </div>
                    <div>
                        <div className='title-semi-bold'>Имя пользователя</div>
                        <Input value={user.username} placeholder='Имя пользователя'
                               onChange={handleUserName}/></div>
                </div>
            </Container>
            <div className='footer-btn-container footer'>
                <Button onClick={handleSave} disabled={!userChange}>Сохранить</Button>
            </div>
        </div>
    )
}