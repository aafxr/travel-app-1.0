import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {TelegramAuthPayloadType} from "../../types/TelegramAuthPayloadType";
import Navigation from "../../components/Navigation/Navigation";
import {useAppContext} from "../../contexts/AppContextProvider";
import {UserController} from "../../core/service-controllers";
import Container from "../../components/Container/Container";
import {TelegramAuth} from "../../components/TelegramAuth";
import {PageHeader} from "../../components/ui";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {removeUser, setUser} from "../../redux/slices/user-slice";



/**
 * компонент реализует способы авторизации пользователя
 * @function
 * @name Login
 * @returns {JSX.Element}
 * @category Pages
 */
export function Login() {
    const navigate = useNavigate()
    const ctx = useAppContext()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(location.hostname === 'localhost')
            UserController
                .getLoggedInUser(ctx)
                .then(u => {
                    console.log(u);
                    return u
                })
                .then(u => u && dispatch(setUser(u)))
                .then(() => navigate('/'))
                .catch(defaultHandleError)
    }, [])

    /**
     * обработчик, получает от telegram инфо о авторизации пользователя и отправляет на удаленный сервер
     * @param authPayload
     */
    function tgAuthHandler(authPayload: TelegramAuthPayloadType) {
        UserController.logIn(ctx, authPayload)
            .then(user => {
                if (user) dispatch(setUser(user))
                else dispatch(removeUser())
                navigate('/')
            })
            .catch(defaultHandleError)
    }

    return (
        <div className='wrapper'>
            <Container className='content column gap-1'>
                <PageHeader arrowBack title={'Войти'}/>
                <TelegramAuth handleAuth={tgAuthHandler}/>
            </Container>
            <Navigation className='footer'/>
        </div>
    )
}