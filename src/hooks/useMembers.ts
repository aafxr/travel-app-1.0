import {useEffect, useState} from "react";

import defaultHandleError from "../utils/error-handlers/defaultHandleError";
import {useAppContext} from "../contexts/AppContextProvider";
import {MemberController} from "../core/service-controllers";
import {Member, Travel} from "../core/classes";
import {useTravel} from "./redux-hooks";

export function useMembers(){
    const context = useAppContext()
    const {travel} = useTravel()
    const [members, setMembers] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if(!travel) return
        const ids = Travel.getMembers(travel)

        MemberController.readAll(context, ...ids)
            .then(setMembers)
            .catch(defaultHandleError)
            .finally(() => setLoading(false))
    }, [travel])


    return {members, membersLoading: loading}
}