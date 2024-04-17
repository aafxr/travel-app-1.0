import {Navigate, Route, Routes} from "react-router-dom";
import {Events, Favorite, Main, Profile, TravelRoutes} from "./pages";
import AuthRequired from "./hoc/AuthRequired";


function App() {

    return (
        <Routes>
            <Route path={'/'} element={<Main/>}/>
            <Route element={<AuthRequired/>}>
                <Route path={'/travels/:travelType/'} element={<TravelRoutes/>}/>
                <Route path={'/events/'} element={<Events/>}/>
                <Route path={'/favorite/'} element={<Favorite/>}/>
                <Route path={'/profile/'} element={<Profile/>}/>
            </Route>
            <Route path={'*'} element={<Navigate to={'/'} replace/>}/>
        </Routes>
    );
}

export default App;
