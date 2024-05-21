import {useCallback} from "react";

import {useAppContext} from "../../contexts/AppContextProvider";
import {useAppDispatch, useTravel} from "../redux-hooks";
import {Place, Travel} from "../../core/classes";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {PlaceController, TravelController} from "../../core/service-controllers";
import {addPlace} from "../../redux/slices/places-slice";
import {updateTravel} from "../../redux/slices/travel-slice";

export function useAddPlace(){
    const context = useAppContext()
    const {travel} = useTravel()
    const dispatch = useAppDispatch()

    return useCallback(async (places: Place[]) => {
        if(!travel) return
        const t = new Travel(travel)
        try {
            const pp = []
            for (const p of places){
                p.id = Place.getID(travel, p.id)
                pp.push(PlaceController.create(context, p).catch(defaultHandleError))
                const idx = t.places_id.findIndex(id => p.id)
                if(idx === -1) t.places_id.push(p.id)
                else t.places_id[idx] = p.id
            }
            await Promise.all(pp)
            await TravelController.update(context, t)
            places.forEach(p => dispatch(addPlace(p)))
            dispatch(updateTravel(t))

        }catch (e){
            defaultHandleError(e as Error)
        }
    }, [travel, context, dispatch])

}