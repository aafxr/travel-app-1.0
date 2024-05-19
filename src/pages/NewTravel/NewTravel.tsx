import {createContext, useContext, useEffect, useState, PropsWithChildren, JSX} from "react";
import {Hotel, Place, Travel} from "../../core/classes";
import {Step_1_TravelName} from "./Step_1_TravelName";
import {useUser} from "../../hooks/redux-hooks";
import {Navigate, Outlet} from "react-router-dom";
import {Step_2_TravelSettings} from "./Step_2_TravelSettings";
import {Step_4_AddDetails} from "./Step_4_AddDetails";
import {Step_3_AdviceRoute} from "./Step_3_AdviceRoute";

const steps = {
    Step_1_TravelName,
    Step_2_TravelSettings,
    Step_3_AdviceRoute,
    Step_4_AddDetails
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


    if(!user) return <Navigate to={'/login/'}/>


    let props: TravelStepPropsType
    switch (step){
        case "Step_1_TravelName":
            props = { next: handleStep_1_TravelName}
            break
        case "Step_2_TravelSettings":
            props = { next: handleStep_2_TravelSettings}
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