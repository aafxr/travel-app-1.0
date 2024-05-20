import clsx from "clsx";
import {useState} from "react";

import {useTravel} from "../../contexts/AppContextProvider";
import {MemberRole} from "../../types/MemberRole";
import {Member, Travel} from "../../core/classes";
import {DEFAULT_IMG_URL} from "../../constants";
import Button from "../ui/Button/Button";
import {PlusIcon} from "../svg";

import './MembersList.css'

export type MembersListType = {
    members: Member[]
}

export function MembersList({members}: MembersListType){
    const travel = useTravel()
    const [showMore, setShowMore] = useState(false)

    console.error(members)
    return (
        <div className={clsx('members', {showMore})}>
            {
                members.map(m => (
                    <div key={m.id} className='member'>
                        <div className='member-photo'>
                            <img className='img-abs' src={m.photo || DEFAULT_IMG_URL} alt={m.username}/>
                        </div>
                        <div className='member-inner'>
                            <div className='member-info'>
                                <span className='member-name'>{m.first_name}</span>
                                {!!travel && <span className='member-role'>{MemberRole[Travel.getMemberRole(travel, m.id)]}</span>}
                            </div>
                            <div className='member-extra-info'>в поездке</div>
                        </div>
                    </div>

                ))
            }
            {!showMore && (
                <div className='members-more'>
                    <Button className='members-more-btn'>
                        <span className='members-more-icon'><PlusIcon className='icon'/></span> пригласить еще
                    </Button>
                    <span className='link' onClick={() => setShowMore(true)}>Свернуть</span>
                </div>
            )}
            {showMore && <button className='member-invite-btn' onClick={() => setShowMore(false)}><PlusIcon className='icon'/></button>}
        </div>
    )
}