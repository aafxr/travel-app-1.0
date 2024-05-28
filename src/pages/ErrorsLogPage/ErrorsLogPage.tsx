import {useEffect, useState} from "react";
import defaultHandleError, {LogErrorType} from "../../utils/error-handlers/defaultHandleError";
import {useAppContext} from "../../contexts/AppContextProvider";
import {ErrorController} from "../../core/service-controllers";
import Container from "../../components/Container/Container";
import {PageHeader} from "../../components/ui";

import './ErrorsLogPage.css'

export function ErrorsLogPage(){
    const context = useAppContext()
    const [errors, setErrors] = useState<LogErrorType[]>([])


    useEffect(()=> {
        ErrorController.read(context, new Date(), 100)
            .then(setErrors)
            .catch(defaultHandleError)
    }, [])


    return (
        <div className='wrapper'>
            <Container>
                <PageHeader arrowBack title={'Лог ошибок'} />
            </Container>
            <Container className='content'>
                <ul className='errors'>
                    {errors.map(({time, error}) => (
                        <li key={time.getTime()} className='error-item'>
                            <div className='item-text'>{typeof error === 'string' ? error : error.message}</div>
                            <div className='item-time'>{time.toLocaleDateString()}&nbsp;{time.toLocaleTimeString()}</div>
                        </li>
                    ))}
                </ul>
            </Container>
        </div>
    )
}