import {useEffect, useState} from "react";
import {useAppContext} from "./useAppContext";
import {Travel} from "../../core/classes";

export function useTravel(){
    const [state, setState] = useState<{ travel?: Travel }>({travel: undefined})
    const context =  useAppContext()

    useEffect(() => {
        if(context.travel) setState({travel:context.travel})
    }, [context.travel])

    return state.travel || context.travel
}