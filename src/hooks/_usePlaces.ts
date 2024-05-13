import {useEffect, useState} from "react";

import {useAppContext, useTravel} from "../contexts/AppContextProvider";
import {HotelController, PlaceController} from "../core/service-controllers";
import {Hotel, Place} from "../core/classes";
import defaultHandleError from "../utils/error-handlers/defaultHandleError";

function _usePlaces(day?: number){
    const context = useAppContext()
    const travel = useTravel()
    const [places, setPlaces] = useState<Array<Place | Hotel>>([])
    const [placesLoading, setPlacesLoading] = useState(true)

    useEffect(() => {
        if(!travel) return
        if(places.length === travel.places_id.length + travel.hotels_id.length) return

        async function loadPlaces(){
            if(!travel) return
            const _places = await PlaceController.readAll(context, ...travel.places_id)
            const _hotels = await HotelController.readAll(context, ...travel.hotels_id)
            let items = [..._places, ..._hotels]
                .sort((a,b) => a.date_start.getTime() - b.date_start.getTime())
            if(day !== undefined){
                items = items.filter(p => p.day === day)
            }
            setPlaces(items)
        }

        loadPlaces()
            .catch(defaultHandleError)
            .finally(() => setPlacesLoading(false))
    }, [travel, day])

    return {places, placesLoading}
}