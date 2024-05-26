import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import {defaultMovementTags} from "../defaultMovementTags/defaultMovementTags";
import PhotoComponent from "../ui/PhotoComponents/PhotoComponent";
import {Travel} from "../../core/classes";
import Swipe from "../ui/Swipe/Swipe";
import {TrashIcon} from "../svg";
import {Chip} from "../ui";

import './TravelCard.css'
import clsx from "clsx";

interface TravelCardPropsType {
    travel: Travel,
    onRemove: Function
}

/**
 * компонент отображает карточку путешествия
 * @param {Travel} travel
 * @param {function} onRemove
 * @returns {JSX.Element}
 * @constructor
 */
export default function TravelCard({travel, onRemove}: TravelCardPropsType): JSX.Element{
    const navigate = useNavigate()
    const [tagsScrolling, setTextScrolling] = useState(false)
    const travelDays = travel.days === 1 ? '1 день' : `${travel.days} дней`


    function handleRemove() {
        onRemove && onRemove()
    }


    /**  обработка скрола тегов */
    function handleTagsMoving(e: React.TouchEvent<HTMLDivElement>, value: boolean) {
        e.stopPropagation()
        setTextScrolling(value)
    }

    function handleClickCard() {
        navigate(`/travel/${travel.id}/`)
    }



    return (
        <>
            <Swipe
                className='travel-card-swiper'
                onRemove={handleRemove}
                rightElement={
                    <div className='travel-card-icon'>
                        <TrashIcon className='icon' onClick={() => onRemove?.(travel)}/>
                    </div>
                }
                onClick={handleClickCard}
            >
                <div className='travel-item'>
                    <div className='flex-between gap-0.5'>
                        <PhotoComponent className={'travel-image flex-0'} item={travel}/>
                        <div className='travel-content'>
                            <div className='travel-title w-full title-bold'>
                                {travel.title || travel.direction || ''}
                            </div>
                            <div
                                className={clsx('travel-movement row w-full gap-0.5', {tagsScrolling})}
                                onTouchStart={(e) => handleTagsMoving(e, true)}
                                onTouchMove={(e) => handleTagsMoving(e, true)}
                                onTouchEnd={(e) => handleTagsMoving(e, false)}
                            >
                                <Chip color='light-orange' rounded>{travelDays}</Chip>
                                {
                                    travel.movementTypes.map(mt => (
                                        <Chip
                                            key={'' + mt}
                                            color='light-orange'
                                            icon={defaultMovementTags.find(dm => dm.id === mt)?.icon}
                                            iconPosition='left'
                                            rounded
                                        >
                                            {defaultMovementTags.find(dm => dm.id === mt)?.title}
                                        </Chip>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Swipe>
        </>
    )
}