import {createContext, useContext, useEffect, useState, PropsWithChildren} from "react";
import {Hotel, Place, Travel} from "../../core/classes";
import {Step_1_TravelName} from "./Step_1_TravelName";
import {useUser} from "../../hooks/redux-hooks";
import {Navigate, Outlet} from "react-router-dom";
import {Step_2_TravelSettings} from "./Step_2_TravelSettings";
import {Step_3_AddDetails} from "./Step_3_AddDetails";

const steps = {
    Step_1_TravelName,
    Step_2_TravelSettings,
    Step_3_AddDetails
}


export type TravelStepPropsType = {
    next: (t: Travel, step?: keyof typeof steps) => unknown
}


export type NewTravelContextType = {
    travel: Travel
    places: Place[]
    hotels: Hotel[]
}

const defaultNewTravelContext: NewTravelContextType= {
    travel: new Travel(),
    places: [],
    hotels: []
}

export const NewTravelContext = createContext(defaultNewTravelContext)

export function NewTravelContextProvider({children}: PropsWithChildren) {
    const ntc = useContext(NewTravelContext)

    return (
        <NewTravelContext.Provider value={ntc}>
            <Outlet/>
            {children}
        </NewTravelContext.Provider>
    )
}


function NewTravelSteps(){
    const ntc = useContext(NewTravelContext)
    const {user} = useUser()
    const [step, setStep] = useState<keyof typeof steps>('Step_1_TravelName');


    useEffect(() => {
        if (!user) return
        ntc.travel.owner_id = user.id
    }, []);


    function handleStep_1_TravelName(t: Travel){
        ntc.travel = t
        setStep("Step_2_TravelSettings")
    }


    const handleStep_2_TravelSettings: TravelStepPropsType["next"] = (t, s) => {
        ntc.travel = t
        s ? setStep(s) : setStep("Step_3_AddDetails")
    }


    if(!user) return <Navigate to={'/login/'}/>


    let Step: JSX.Element | null = null;
    switch (step){
        case "Step_1_TravelName":
            Step = steps[step]({ next: handleStep_1_TravelName})
            break
        case "Step_2_TravelSettings":
            Step = steps[step]({ next: handleStep_2_TravelSettings})
            break
    }


    return (
        <NewTravelContext.Provider value={ntc}>
            {Step}
        </NewTravelContext.Provider>
    )


}

export function NewTravel(){
    return (
        <NewTravelContextProvider>
            <NewTravelSteps />
        </NewTravelContextProvider>
    )
}