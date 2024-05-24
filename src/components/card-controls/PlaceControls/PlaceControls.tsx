import {useNavigate} from "react-router-dom";

import {useHandleRemoveHotel, useHandleRemovePlace} from "../../../hooks/handlers";
import {useTravel} from "../../../hooks/redux-hooks";
import {Hotel, Place} from "../../../core/classes";
import {EditePencil, TrashIcon} from "../../svg";


type PlaceControlsPropsType = {
    place: Place | Hotel
}


export function PlaceControls({place}: PlaceControlsPropsType){
    const navigate = useNavigate()
    const {travel} = useTravel()

    const handleRemovePlace = useHandleRemovePlace()
    const handleRemoveHotel = useHandleRemoveHotel()


    function handleEditePlaceClick(){
        place instanceof Place
            ? navigate(`/travel/${travel?.id}/place/${place.id}/edite/`)
            : navigate(`/travel/${travel?.id}/hotel/${place.id}/edite/`)
    }


    function handleRemoveClick(){
        place instanceof Place ? handleRemovePlace(place) : handleRemoveHotel(place)
    }


    return (
        <div className='h-full column center gap-1'>
            <EditePencil className='icon' onClick={handleEditePlaceClick} />
            <TrashIcon className='icon' onClick={handleRemoveClick} />
        </div>
    )
}