import {Navigate, Route, Routes} from "react-router-dom";
import {Events, Favorite, Login, Main, Profile, TravelAdd, TravelRoutes} from "./pages";
import AuthRequired from "./hoc/AuthRequired";


function App() {

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
            </Route>
            <Route path={'*'} element={<Navigate to={'/'} replace/>}/>
        </Routes>
    );
}

export default App;
