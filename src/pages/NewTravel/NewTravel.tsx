import {Navigate, Outlet} from "react-router-dom";
import {createContext, useContext, useEffect, useState, PropsWithChildren} from "react";

import {Step_2_TravelSettings} from "./Step_2_TravelSettings";
import {Hotel, Place, Travel} from "../../core/classes";
import {Step_3_AdviceRoute} from "./Step_3_AdviceRoute";
import {Step_4_AddDetails} from "./Step_4_AddDetails";
import {Step_1_TravelName} from "./Step_1_TravelName";
import {useUser} from "../../hooks/redux-hooks";
import {Step_AddPlace} from "./Step_AddPlace";
import {Step_AddHotel} from "./Step_AddHotel";

const steps = {
    Step_1_TravelName,
    Step_2_TravelSettings,
    Step_3_AdviceRoute,
    Step_4_AddDetails,
    Step_AddPlace,
    Step_AddHotel
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

function NewTravelContextProvider({children}: PropsWithChildren) {
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
        s ? setStep(s) : setStep("Step_3_AdviceRoute")
    }


    const  handleStep_3_AdviceRoute: TravelStepPropsType["next"] = (t, step) => {
        ntc.travel = t
        step ? setStep(step) : setStep("Step_2_TravelSettings")
    }


    const handleStep_4_AddDetails: TravelStepPropsType["next"] = (t, step) => {
        ntc.travel = t
        if(step) setStep(step)
    }


    const handleNavigateStep: TravelStepPropsType["next"] = (t, step) => {
        ntc.travel = t
        if(step) setStep(step)
    }


    if(!user) return <Navigate to={'/login/'}/>


    let props: TravelStepPropsType
    switch (step){
        case "Step_1_TravelName":
            props = { next: handleStep_1_TravelName}
            break
        case "Step_2_TravelSettings":
            props = { next: handleStep_2_TravelSettings}
            break
        case "Step_3_AdviceRoute":
            props = {next: handleStep_3_AdviceRoute}
            break
        case "Step_4_AddDetails":
            props = {next: handleStep_4_AddDetails}
            break
        case "Step_AddPlace":
            props = {next: handleNavigateStep}
            break
        case "Step_AddHotel":
            props = {next: handleNavigateStep}
            break

        default:
            props = {next: t => {}}
    }

    const Step = steps[step]

    return <Step {...props} />
}

export function NewTravel(){
    const ntc = useContext(NewTravelContext)

    return (
        <NewTravelContext.Provider value={ntc}>
            <NewTravelSteps />
        </NewTravelContext.Provider>
    )
}