import {useAppContext} from "./useAppContext";
import {useEffect, useState} from "react";
import {User} from "../../core/classes";

function useUser(){
    const [state, setState] = useState<{ user?:User }>({user:undefined})
    const context = useAppContext()

    useEffect(() => {
        setState({user: context.user})
    }, [context.user])

     return state.user || context.user
}