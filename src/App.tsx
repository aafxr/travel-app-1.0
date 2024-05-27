import {useEffect} from "react";
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
import {SocketContextProvider} from "./contexts/SocketContextProvider";
import {LimitContextProvider} from "./contexts/LimitContextProvider";
import {ExpensesPage} from "./pages/ExpensesPage/ExpensesPage";
import {SectionController} from "./core/service-controllers";
import {useAppDispatch, useUser} from "./hooks/redux-hooks";
import {useAppContext} from "./contexts/AppContextProvider";
import Container from "./components/Container/Container";
import {ExpenseAdd} from "./pages/ExpenseAdd/ExpenseAdd";
import {ActionDto, TravelDTO} from "./core/classes/dto";
import {Action, Compare, Recover, Travel} from "./core/classes";
import {NewTravel} from "./pages/NewTravel/NewTravel";
import {LimitAdd} from "./pages/LimitAdd/LimitAdd";
import Loader from "./components/Loader/Loader";
import {RouteAdvice} from "./pages/RouteAdvice";
import AuthRequired from "./hoc/AuthRequired";
import {TravelLayout} from "./layouts";
import {DB} from "./core/db/DB";
import {TravelDateChange} from "./pages/TravelDateChange/TravelDateChange";
import {TravelMembersSettings} from "./pages/TravelMembersSettings/TravelMembersSettings";
import {TravelRules} from "./pages/TravelRules/TravelRules";
import {TravelEditDescription} from "./pages/TravelEditDescription/TravelEditDescription";
import {useTravelSubject} from "./contexts/SubjectContextProvider";
import {TravelAddPlace} from "./pages/TravelAddPlace/TravelAddPlace";
import {compare} from "./utils/compare";
import {assign} from "./utils/assign";
import {PlaceEdite} from "./pages/PlaceEdite/PlaceEdite";
import {UserSettings} from "./pages/UserSettings/UserSettings";


function App() {
    const ctx = useAppContext()
    const dispatch = useAppDispatch()
    const {loading, actions: {loadUser}} = useUser()
    const travelSubject = useTravelSubject()


    useEffect(() => {
        SectionController.readAll(ctx)
            .then(sections => {
                if(!sections.length)
                    SectionController.init(ctx).catch(defaultHandleError)
            })
            .catch(defaultHandleError)
    }, []);


    useEffect(() => {
        dispatch(loadUser({ctx}))
    }, [])


    useEffect(() => {
        const sub = travelSubject.subscribe((t) => console.log('next: ', t))
        return () => {sub.unsubscribe()}
    }, []);

    window.Recover = Recover
    window.DB = DB
    // @ts-ignore
    window.TravelDTO = TravelDTO
    window.Travel = Travel
    window.Action = Action
    // @ts-ignore
    window.ActionDto = ActionDto
    window.Compare = Compare
    window.compare = compare
    window.assign = assign

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
                    <Route path={'/travels/:travelType/'} element={<TravelRoutes/>}/>
                    <Route path={'/travel/add/'} element={<TravelAdd/>}/>
                    <Route path={'/newTravel/'} element={<NewTravel />}/>
                    <Route element={<TravelLayout />}>
                        <Route path={'/travel/:travelCode/settings/'} element={<TravelSettings/>}/>
                        <Route path={'/travel/:travelCode/advice-route/'} element={<RouteAdvice/>}/>
                        <Route path={'/travel/:travelCode/'} element={<CurrentTravel/>}/>
                        <Route path={'/travel/:travelCode/:travelDay/'} element={<CurrentTravel/>}/>
                        <Route path={'/travel/:travelCode/date/'} element={<TravelDateChange/>}/>
                        <Route path={'/travel/:travelCode/members/'} element={<TravelMembersSettings/>}/>
                        <Route path={'/travel/:travelCode/rules/'} element={<TravelRules/>}/>
                        <Route path={'/travel/:travelCode/edite/'} element={<TravelEditDescription/>}/>
                        <Route path={'/travel/:travelCode/newPlace/'} element={<TravelAddPlace/>}/>

                        <Route path={'/travel/:travelCode/place/:placeCode/edite/'} element={<PlaceEdite/>}/>


                        <Route element={<LimitContextProvider/>}>
                            <Route path={'/travel/:travelCode/expenses/'} element={<ExpensesPage/>}/>
                            <Route path={'/travel/:travelCode/expenses/:expenseType/'} element={<ExpensesPage/>}/>
                            <Route path={'/travel/:travelCode/expenses/:expenseType/add/'} element={<ExpenseAdd/>}/>
                            <Route path={'/travel/:travelCode/expenses/:expenseType/add/:expenseCode/'} element={<ExpenseAdd/>}/>
                            <Route path={'/travel/:travelCode/limit/add/:sectionCode/'} element={<LimitAdd/>}/>
                        </Route>
                    </Route>

                    <Route path={'/profile/'} element={<Profile/>}/>
                    <Route path={'/profile/settings/user/'} element={<UserSettings/>}/>
                </Route>
            </Route>
            <Route path={'/dev/'} element={<Dev/>}/>
            <Route path={'*'} element={<Navigate to={'/'} replace/>}/>
        </Routes>
    );
}

export default App;
