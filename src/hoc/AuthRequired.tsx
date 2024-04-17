import React, {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";

import {useAppContext} from "../contexts/AppContextProvider";
import PageContainer from "../components/PageContainer/PageContainer";
import Loader from "../components/Loader/Loader";
import defaultHandleError from "../utils/error-handlers/defaultHandleError";
import {UserController} from "../core/service-controllers";

/**
 * hoc component обертка, если пользователь не авторизован перенаправляет пользователя на страницу авторизации
 */
export default function AuthRequired() {
    const context = useAppContext()
    const [loading, setLoading, ] = useState(true)


    useEffect(() => {
        if (!context.user)
            setLoading(true)
            UserController.getLoggedInUser(context)
                .then((user) => {
                    if (user) context.setUser(user)
                })
                .catch(defaultHandleError)
                .finally(() =>  setLoading(false) )
    }, [context])


    if (loading) {
        return (
            <PageContainer center>
                <Loader className='loader'/>
            </PageContainer>
        )
    }


    if (context.user) {
        return <Outlet/>
    }


    return <Navigate to={'/login/'}/>
}