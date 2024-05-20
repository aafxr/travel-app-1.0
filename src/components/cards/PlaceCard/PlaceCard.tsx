import {PropsWithChildren, useState} from "react";

import PhotoCarousel from "../../PhotoCarousel/PhotoCarousel";
import {EditePencil, PhotoIcon, TrashIcon} from "../../svg";
import ChipInput from "../../ui/ChipInput/ChipInput";
import {DEFAULT_IMG_URL} from "../../../constants";
import {Place} from "../../../core/classes";
import Swipe from "../../ui/Swipe/Swipe";
import {Chip} from "../../ui";

import './PlaceCard.css'

interface PlaceCardPropsType extends PropsWithChildren {
    place: Place
    onAdd?: (place: Place) => unknown
    onEdite?: (place: Place) => unknown
    onDelete?: (place: Place) => unknown
    onPhotoAdd?: (place: Place) => unknown
    onTimeStartChange?: (place: Place, date: Date) => unknown
    onTimeEndChange?: (place: Place, date: Date) => unknown
}

/**
 * Компонент - карточка с описанием места
 * @function
 * @param children
 * @param place
 * @param onAdd
 * @param onEdite
 * @param onDelete
 * @param onPhotoAdd
 * @param onTimeStartChange
 * @param onTimeEndChange
 */
export default function PlaceCard({
                                      children,
                                      place,
                                      onAdd,
                                      onEdite,
                                      onDelete,
                                      onPhotoAdd,
                                      onTimeStartChange,
                                      onTimeEndChange
                                  }: PlaceCardPropsType) {
    const [startChange, setStartChange] = useState(false)
    const [endChange, setEndChange] = useState(false)


    const rightElement = (
        <div className='column gap-0.5'>
            {/*<PlusIcon className='control-button flex-0' onClick={() => onAdd && onAdd(id)}/>*/}
            {/*<EditePencil className='control-button flex-0' onClick={() => onEdite && onEdite(id)}/>*/}
            <div className='column' onClick={() => onDelete && onDelete(place)}>
                <TrashIcon className='control-button flex-0'/>
                <span>Удалить</span>
            </div>
        </div>
    )


    function handleDateChange(date: Date, type: 'start' | 'end') {
        if (type === "start") {
            setStartChange(false)
            onTimeStartChange && onTimeStartChange(place, date)
        } else if (type === 'end') {
            setEndChange(false)
            onTimeEndChange && onTimeEndChange(place, date)
        }
    }


    return (
        <Swipe
            // className={'place'}
            // rElemBg='place-swipe-right'
            // lElemBg='place-swipe-left'
            rightElement={
                <div className='h-full center'>
                    <TrashIcon className='icon' onClick={() => onDelete && onDelete(place)}/>
                </div>
            }

        >
            <div className='place relative'>
                <div className='place-container relative'>
                    {
                        !!place && (
                            <>

                                {/*{*/}
                                {/*    !startChange*/}
                                {/*        ? <Chip*/}
                                {/*            onTouchStart={(e) => setStartChange(true)}*/}
                                {/*            className='place-date-start'*/}
                                {/*        > {place.date_start.toLocaleTimeString().slice(0, 5)} </Chip>*/}
                                {/*        : <ChipInput*/}
                                {/*            className='place-date-start'*/}
                                {/*            value={new Date(place.date_start)}*/}
                                {/*            onChange={(date) => handleDateChange(date, 'start')}*/}
                                {/*        />*/}
                                {/*}*/}
                                {/*{*/}
                                {/*    !endChange*/}
                                {/*        ? <Chip*/}
                                {/*            onTouchStart={(e) => setEndChange(true)}*/}
                                {/*            className='place-date-end'*/}
                                {/*        > {place.date_end.toLocaleTimeString().slice(0, 5)} </Chip>*/}
                                {/*        : <ChipInput*/}
                                {/*            className='place-date-end'*/}
                                {/*            value={new Date(place.date_end)}*/}
                                {/*            onChange={(date) => handleDateChange(date, 'end')}*/}
                                {/*        />*/}
                                {/*}*/}
                                <div className='place-img'>
                                    {
                                        (place.photos && place.photos.length)
                                            ? <PhotoCarousel urls={place.photos} className='img-abs'/>
                                            : <PhotoCarousel urls={[DEFAULT_IMG_URL]} className='img-abs'/>
                                    }
                                    {/*<PhotoCarousel urls={imgURLs} />*/}
                                    <div className='place-buttons'>
                                        {
                                            !!onPhotoAdd && <button
                                                className='rounded-button place-btn'
                                                onClick={() => onPhotoAdd(place)}
                                            >
                                                <PhotoIcon/></button>
                                        }
                                        {
                                            !!onEdite && <button
                                                className='rounded-button place-btn'
                                                onClick={() => onEdite(place)}
                                            >
                                                <EditePencil/></button>
                                        }
                                    </div>
                                </div>
                                <div className='place-inner place-add-btn'>
                                    <div className='place-title'>{place.name}</div>
                                    <div className='place-entity-type'>{place.formatted_address}</div>
                                </div>
                                {children}
                                {/*{*/}
                                {/*    !!onAdd && (*/}
                                {/*        <IconButton*/}
                                {/*            className='location-add-button'*/}
                                {/*            iconClass='location-add-button-icon'*/}
                                {/*            icon={selected ? <CheckIcon/> : <PlusIcon/>}*/}
                                {/*            border={true}*/}
                                {/*            shadow={false}*/}
                                {/*            onClick={() => onAdd && onAdd(item)}*/}
                                {/*            small*/}
                                {/*        />*/}
                                {/*    )*/}
                                {/*}*/}
                            </>
                        )
                    }
                </div>
            </div>

        </Swipe>
    )
}

