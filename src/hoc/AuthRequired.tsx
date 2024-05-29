import React, {useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";

import PageContainer from "../components/PageContainer/PageContainer";
import {useAppContext} from "../contexts/AppContextProvider";
import {useAppDispatch} from "../hooks/redux-hooks";
import Loader from "../components/Loader/Loader";
import {useUser} from "../hooks/redux-hooks";

/**
 * hoc component обертка, если пользователь не авторизован перенаправляет пользователя на страницу авторизации
 */
export default function AuthRequired() {
    const {user, loading,  actions: {loadUser}} = useUser()
    const context = useAppContext()
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (!user)
            dispatch(loadUser({ctx: context}))
            // UserController.getLoggedInUser(context)
            //     .then((user) => {
            //         if (user) context.setUser(user)
            //     })
            //     .catch(defaultHandleError)
            //     .finally(() =>  setLoading(false) )
    }, [user])


    if (loading) {
        return (
            <PageContainer center>
                <Loader className='loader'/>
            </PageContainer>
        )
    }


    if (user && (user.token || user.refresh_token || location.hostname === 'localhost')) {
        return <Outlet/>
    }


    return <Navigate to={'/login/'}/>
}