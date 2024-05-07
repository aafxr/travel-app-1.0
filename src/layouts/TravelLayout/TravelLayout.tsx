import {useEffect, useState} from "react";
import {Outlet, useParams} from "react-router-dom";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext} from "../../contexts/AppContextProvider";
import {TravelController} from "../../core/service-controllers";
import {loadTravel} from "../../redux/slices/travel-slice";
import {useAppDispatch} from "../../hooks/redux-hooks";
import Loader from "../../components/Loader/Loader";


export function TravelLayout(){
    const context = useAppContext()
    const {travelCode} = useParams()
    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if(travelCode){
            setLoading(true)
            TravelController.read(context, travelCode)
                .then(t => t && context.setTravel(t))
                .catch(defaultHandleError)
                .finally(() => setLoading(false))

            dispatch(loadTravel({ctx: context, travelID: travelCode}))
        }
    }, [travelCode]);



    if(loading)
        return (
            <div className='h-full center'>
                <Loader />
            </div>
        )

    return <Outlet/>
}