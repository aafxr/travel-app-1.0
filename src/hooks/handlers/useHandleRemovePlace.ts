import {useCallback} from "react";

import {PlaceController, TravelController} from "../../core/service-controllers";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext} from "../../contexts/AppContextProvider";
import {updateTravel} from "../../redux/slices/travel-slice";
import {removePlace} from "../../redux/slices/places-slice";
import {useAppDispatch, useTravel} from "../redux-hooks";
import {Place, Travel} from "../../core/classes";

export function useHandleRemovePlace() {
    const context = useAppContext()
    const dispatch = useAppDispatch()
    const {travel} = useTravel()


    return useCallback(async function (p: Place) {
        if (!travel) return
        try {
            const t = new Travel(travel)

            await PlaceController.delete(context, p).catch(defaultHandleError)
            dispatch(removePlace(p))
            t.places_id = t.places_id.filter(id => id !== p.id)
            await TravelController.update(context, t)
            dispatch(updateTravel(t))
        } catch (e) {
            defaultHandleError(e as Error)
        }
    }, [travel, context, dispatch])

}