import clsx from "clsx";

import {useTravel} from "../../contexts/AppContextProvider";
import {Place} from "../../core/classes";
import {StarIcon} from "../svg";
import {Chip} from "../ui";

import './PlaceCard.css'
import {DEFAULT_IMG_URL, month} from "../../constants";



export interface PlaceCardPropsType {
    place: Place
    className?:string
}

export function PlaceCard({
                              place,
                              className
                          }: PlaceCardPropsType) {
    const travel = useTravel()

    return (
        <div className={clsx('place', className)}>
            <img className='place-photo' src={place.photos[0] || DEFAULT_IMG_URL} alt={place.name}/>
            <div className='place-title'>{place.name}</div>
            {place.popularity &&
                <div className='place-rating'><StarIcon className='place-icon'/> {place.popularity}</div>}
            <div className='place-time'>
                {travel?.date_start &&
                    <Chip className='place-label' color={"orange"} rounded >
                        {travel?.date_start.getDay() + place.day + ' ' + month[travel.date_start.getMonth()]}
                    </Chip>}

                <Chip color={"grey"} rounded>
                    {place.date_start.toLocaleTimeString().slice(0,5)}&nbsp;
                    {place.date_end.toLocaleTimeString().slice(0,5)}
                </Chip>
            </div>

        </div>
    )
}