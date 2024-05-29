import React, {PropsWithChildren} from 'react'


import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import Container from "../Container/Container";

interface ErrorBoundaryStateType {
    hasError: boolean,
    error?:Error
}


/**
 * Компонет оборачивает приложение и, в случае возникновения ошибки, отображает страницу об ошибке
 * @category Components
 */
export default class ErrorBoundary extends React.Component<PropsWithChildren, ErrorBoundaryStateType> {
    constructor(props: React.PropsWithChildren) {
        super(props);
        this.state = {hasError: false};
        this.resetState = this.resetState.bind(this)
    }

    static getDerivedStateFromError(error:Error) {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
        // localStorage.setItem(CRITICAL_ERROR, JSON.stringify(errorToObject(error)))
        defaultHandleError(error)


        return {hasError: true, error};

    }

    componentDidCatch(error: Error, errorInfo: any) {
        // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
        console.log('boundary catch')
        console.error(error)
        defaultHandleError(error)
        this.setState({
            hasError: true,
            error
        })
    }

    resetState(){
        this.setState({
            hasError: false,
            error: undefined
        })
        history.pushState(null, '',location.origin + '/')
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className='wrapper'>
                    <Container className='content center'>
                        Error not founded
                        <div className='link' onClick={this.resetState}></div>
                    </Container>
                </div>

                )
        }
        return this.props.children;
    }
}