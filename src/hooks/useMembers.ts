import {useEffect, useState} from "react";

import {useAppContext, useTravel} from "../contexts/AppContextProvider";
import {MemberController} from "../core/service-controllers";
import {Member, Travel} from "../core/classes";
import defaultHandleError from "../utils/error-handlers/defaultHandleError";

export function useMembers(){
    const context = useAppContext()
    const travel = useTravel()
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