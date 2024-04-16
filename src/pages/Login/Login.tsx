import {useNavigate} from "react-router-dom";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {TelegramAuthPayloadType} from "../../types/TelegramAuthPayloadType";
import Navigation from "../../components/Navigation/Navigation";
import {useAppContext} from "../../contexts/AppContextProvider";
import {UserController} from "../../core/service-controllers";
import Container from "../../components/Container/Container";
import {TelegramAuth} from "../../components/TelegramAuth";
import {PageHeader} from "../../components/ui";



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

    /**
     * обработчик, получает от telegram инфо о авторизации пользователя и отправляет на удаленный сервер
     * @param authPayload
     */
    function tgAuthHandler(authPayload: TelegramAuthPayloadType) {
        UserController.logIn(ctx, authPayload)
            .then(user => {
                if (user) ctx.setUser(user)
                else ctx.setUser(null)
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