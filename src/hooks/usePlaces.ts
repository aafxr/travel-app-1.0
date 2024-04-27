import {useEffect, useState} from "react";

import {useAppContext, useTravel} from "../contexts/AppContextProvider";
import {HotelController, PlaceController} from "../core/service-controllers";
import {Hotel, Place} from "../core/classes";
import defaultHandleError from "../utils/error-handlers/defaultHandleError";

export function usePlaces(){
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
            const items = [..._places, ..._hotels].sort((a,b) => a.date_start.getTime() - b.date_start.getTime())
            setPlaces(items)
        }

        loadPlaces()
            .catch(defaultHandleError)
            .finally(() => setPlacesLoading(false))
    }, [travel])

    return {places, placesLoading}
}