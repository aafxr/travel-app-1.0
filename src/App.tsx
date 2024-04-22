import {useEffect, useState} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {
    CurrentTravel,
    Dev,
    Events,
    Favorite,
    Login,
    Main,
    Profile,
    TravelAdd,
    TravelRoutes,
    TravelSettings
} from "./pages";
import defaultHandleError from "./utils/error-handlers/defaultHandleError";
import {useAppContext} from "./contexts/AppContextProvider";
import {UserController} from "./core/service-controllers";
import AuthRequired from "./hoc/AuthRequired";
import Container from "./components/Container/Container";
import Loader from "./components/Loader/Loader";
import {RouteAdvice} from "./pages/RouteAdvice";


function App() {
    const context = useAppContext()
    const [loading, setLoading] = useState(false)

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

    if(loading)
        return (
            <Container className='center h-full'>
                <Loader/>
            </Container>
        )

    return (
        <Routes>
            <Route path={'/'} element={<Main/>}/>
            <Route path={'/login/'} element={<Login/>}/>
            <Route element={<AuthRequired/>}>

                <Route path={'/events/'} element={<Events/>}/>
                <Route path={'/favorite/'} element={<Favorite/>}/>
                <Route path={'/profile/'} element={<Profile/>}/>
                <Route path={'/travels/:travelType/'} element={<TravelRoutes/>}/>
                <Route path={'/travel/add/'} element={<TravelAdd/>}/>
                <Route path={'/travel/:travelCode/settings/'} element={<TravelSettings/>}/>
                <Route path={'/travel/:travelCode/advice-route/'} element={<RouteAdvice/>}/>
                <Route path={'/travel/:travelCode/'} element={<CurrentTravel/>}/>
            </Route>
            <Route path={'/dev/'} element={<Dev/>}/>
            <Route path={'*'} element={<Navigate to={'/'} replace/>}/>
        </Routes>
    );
}

export default App;
