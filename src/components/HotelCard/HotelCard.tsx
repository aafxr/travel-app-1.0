import clsx from "clsx";

import {useTravel} from "../../hooks/redux-hooks";
import {DEFAULT_IMG_URL} from "../../constants";
import {Hotel} from "../../core/classes";
import {StarIcon} from "../svg";
import {Chip} from "../ui";

import './HotelCard.css'

const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

export interface HotelCardPropsType {
    hotel: Hotel
    className?:string
}

export function HotelCard({
                              hotel,
                              className
                          }: HotelCardPropsType) {
    const {travel} = useTravel()

    return (
        <div className={clsx('hotel', className)}>
            <img className='hotel-photo' src={hotel.photo || DEFAULT_IMG_URL} alt={hotel.name}/>
            <div className='hotel-title'>{hotel.name}</div>
            {hotel.rate &&
                <div className='hotel-rating'><StarIcon className='hotel-icon'/> {hotel.rate}</div>}
            <div className='hotel-time'>
                {travel?.date_start &&
                    <Chip className='hotel-label' color={"orange"} rounded >
                        {travel?.date_start.getDay() + hotel.day + ' ' + month[travel.date_start.getMonth()]}
                    </Chip>}

                <Chip color={"grey"} rounded>
                    {hotel.date_start.toLocaleTimeString().slice(0,5)}&nbsp;
                    {hotel.date_end.toLocaleTimeString().slice(0,5)}
                </Chip>
            </div>

        </div>
    )
}