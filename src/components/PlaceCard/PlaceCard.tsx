import clsx from "clsx";

import {DEFAULT_IMG_URL, month} from "../../constants";
import {useTravel} from "../../hooks/redux-hooks";
import {Place} from "../../core/classes";
import {StarIcon} from "../svg";
import {Chip} from "../ui";

import './PlaceCard.css'


const timeFormatOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
}


export interface PlaceCardPropsType {
    place: Place
    className?:string
    onClick?:(place: Place) => unknown
}

export function PlaceCard({
                              place,
                              className
                          }: PlaceCardPropsType) {
    const {travel} = useTravel()

    return (
        <div className={clsx('place', className)}>
            <img className='place-photo' src={place.photos[0] || DEFAULT_IMG_URL} alt={place.name}/>
            <div className='inner'>
                <div className='place-title'>{place.name}</div>
                {place.popularity &&
                    <div className='place-rating'><StarIcon className='place-icon'/> {place.popularity}</div>}
                <div className='place-time'>
                    {travel?.date_start &&
                        <Chip className='place-label' color={"orange"} rounded >
                            {travel?.date_start.getDay() + place.day + ' ' + month[travel.date_start.getMonth()]}
                        </Chip>}

                    <Chip color={"grey"} rounded>
                        {place.date_start.toLocaleTimeString(navigator.language, timeFormatOptions)}&nbsp;
                        {place.date_end.toLocaleTimeString(navigator.language, timeFormatOptions)}
                    </Chip>
                </div>
            </div>
        </div>
    )
}