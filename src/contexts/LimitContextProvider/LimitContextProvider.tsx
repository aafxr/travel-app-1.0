import {createContext, useContext, useEffect, useState} from "react";
import {Outlet, useParams} from "react-router-dom";
import {filter} from "rxjs";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {LimitController} from "../../core/service-controllers";
import {useLimitSubject} from "../SubjectContextProvider";
import Loader from "../../components/Loader/Loader";
import {useAppContext} from "../AppContextProvider";
import {Limit} from "../../core/classes";


export type LimitContextType = Record<string, Limit>


export const LimitContext = createContext<LimitContextType>({})


export function LimitContextProvider(){
    const {travelCode} = useParams()
    const context = useAppContext()
    const limitContext = useContext(LimitContext)
    const [limitsLoading, setLimitsLoading] = useState(false)
    const limitSubject = useLimitSubject()

    useEffect(() => {
        const travel = context.travel
        if(!travel) return

        setLimitsLoading(true)
        LimitController.readAllByTravelID(context, travel.id)
            .then(limits => limits.forEach(l => limitContext[l.id] = l) )
            .catch(defaultHandleError)
            .finally(() => setLimitsLoading(false))
    }, []);


    useEffect(() => {
        const subscription = limitSubject
            .pipe(filter(l => l.primary_entity_id === travelCode))
            .subscribe((limit) => limitContext[limit.id] = limit)
        return () => {subscription.unsubscribe()}
    }, []);


    if(limitsLoading)
        return (
            <div className='h-full center'>
                <Loader />
            </div>
        )


    return (
        <LimitContext.Provider value={limitContext}>
            <Outlet/>
        </LimitContext.Provider>
    )
}