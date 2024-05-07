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
import {SectionController} from "./core/service-controllers/SectionController";
import defaultHandleError from "./utils/error-handlers/defaultHandleError";
import {SocketContextProvider} from "./contexts/SocketContextProvider";
import {LimitContextProvider} from "./contexts/LimitContextProvider";
import {ExpensesPage} from "./pages/ExpensesPage/ExpensesPage";
import {useAppContext} from "./contexts/AppContextProvider";
import {UserController} from "./core/service-controllers";
import Container from "./components/Container/Container";
import {ExpenseAdd} from "./pages/ExpenseAdd/ExpenseAdd";
import {LimitAdd} from "./pages/LimitAdd/LimitAdd";
import Loader from "./components/Loader/Loader";
import {RouteAdvice} from "./pages/RouteAdvice";
import AuthRequired from "./hoc/AuthRequired";
import {TravelLayout} from "./layouts";


function App() {
    const context = useAppContext()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        SectionController.readAll(context)
            .then(sections => {
                if(!sections.length)
                    SectionController.init(context).catch(defaultHandleError)
            })
            .catch(defaultHandleError)
    }, []);


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
                <Route element={<SocketContextProvider/>} >
                    <Route path={'/events/'} element={<Events/>}/>
                    <Route path={'/favorite/'} element={<Favorite/>}/>
                    <Route path={'/profile/'} element={<Profile/>}/>
                    <Route path={'/travels/:travelType/'} element={<TravelRoutes/>}/>
                    <Route path={'/travel/add/'} element={<TravelAdd/>}/>
                    <Route element={<TravelLayout />}>
                        <Route path={'/travel/:travelCode/settings/'} element={<TravelSettings/>}/>
                        <Route path={'/travel/:travelCode/advice-route/'} element={<RouteAdvice/>}/>
                        <Route path={'/travel/:travelCode/'} element={<CurrentTravel/>}/>
                        <Route path={'/travel/:travelCode/:travelDay/'} element={<CurrentTravel/>}/>
                        <Route element={<LimitContextProvider/>}>
                            <Route path={'/travel/:travelCode/expenses/'} element={<ExpensesPage/>}/>
                            <Route path={'/travel/:travelCode/expenses/:expenseType/'} element={<ExpensesPage/>}/>
                            <Route path={'/travel/:travelCode/expenses/:expenseType/add/'} element={<ExpenseAdd/>}/>
                            <Route path={'/travel/:travelCode/expenses/:expenseType/add/:expenseCode/'} element={<ExpenseAdd/>}/>
                            <Route path={'/travel/:travelCode/limit/add/:sectionCode/'} element={<LimitAdd/>}/>
                        </Route>
                    </Route>
                </Route>
            </Route>
            <Route path={'/dev/'} element={<Dev/>}/>
            <Route path={'*'} element={<Navigate to={'/'} replace/>}/>
        </Routes>
    );
}

export default App;
