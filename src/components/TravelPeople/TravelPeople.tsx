import clsx from "clsx";
import {useEffect, useState} from "react";

import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext, useTravel} from "../../contexts/AppContextProvider";
import {MemberController} from "../../core/service-controllers";
import {MemberRole} from "../../types/MemberRole";
import {Member, Travel} from "../../core/classes";
import {Photo} from "../Photo/Photo";

import './TravelPeople.css'

interface ITravelPeople {
    classname?: string
    memberID: string
    onClick?: (memberID: Member) => unknown
}

export function TravelPeople({
                                 classname,
                                 memberID,
                                 onClick
                             }: ITravelPeople){
    const ctx = useAppContext()
    const travel = useTravel()!
    const [member, setMember] = useState<Member>()
    let role

    switch (Travel.getMemberRole(travel, memberID)){
        case MemberRole.OWNER:
            role = 'owner'
            break
        case MemberRole.ADMIN:
            role = 'admin'
            break
        case MemberRole.EDITOR:
            role = 'editor'
            break
        case MemberRole.COMMENTATOR:
            role = 'commentator'
            break
        default:
            role = 'watcher'
    }

    useEffect(() => {
        MemberController.read(ctx, memberID)
            .then(setMember)
            .catch(defaultHandleError)
    }, [])

    function handlePeopleClick(){
        if(!onClick || !member) return
        onClick(member)
    }

    if (!member) return null

    return (
        <div
            className={clsx('person', classname)}
            onClick={handlePeopleClick}
        >
            <Photo id={member.photo} className='person-photo'/>
            <div className='person-container flex-stretch w-full'>
                <div className={'person-name'}>{member.first_name}</div>
                <div className={'person-role'}>{role}</div>
            </div>
        </div>
    )
}