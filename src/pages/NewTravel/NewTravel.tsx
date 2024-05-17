import {useEffect, useState} from "react";
import {Travel} from "../../core/classes";
import {Step_1_TravelName} from "./Step_1_TravelName";
import {useUser} from "../../hooks/redux-hooks";
import {Navigate} from "react-router-dom";
import {Step_2_TravelSettings} from "./Step_2_TravelSettings";
import {Step_3_AddDetails} from "./Step_3_AddDetails";

const steps = {
    Step_1_TravelName,
    Step_2_TravelSettings,
    Step_3_AddDetails
}




export type TravelStepPropsType = {
    travel: Travel
    next: (t: Travel, step?: keyof typeof steps) => unknown
}


export function NewTravel(){
    const {user} = useUser()
    const [travel, setTravel] = useState<Travel>(new Travel());
    const [step, setStep] = useState<keyof typeof steps>('Step_1_TravelName');


    useEffect(() => {
        if (!user) return
        travel.owner_id = user.id
        setTravel(new Travel(travel))
    }, []);


    function handleStep_1_TravelName(t: Travel){
        setTravel(t)
        setStep("Step_2_TravelSettings")
    }


    const handleStep_2_TravelSettings: TravelStepPropsType["next"] = (t, s) => {
        setTravel(t)
        s && setStep(s)
    }


    if(!user)
        return <Navigate to={'/login/'}/>



    switch (step){
        case "Step_1_TravelName":
            return steps[step]({travel, next: handleStep_1_TravelName})
        case "Step_2_TravelSettings":
            return steps[step]({travel, next: handleStep_2_TravelSettings})
    }

}