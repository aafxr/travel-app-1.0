import {useCallback} from "react";

import {HotelController, TravelController} from "../../core/service-controllers";
import defaultHandleError from "../../utils/error-handlers/defaultHandleError";
import {useAppContext} from "../../contexts/AppContextProvider";
import {updateTravel} from "../../redux/slices/travel-slice";
import {useAppDispatch, useTravel} from "../redux-hooks";
import {Hotel, Travel} from "../../core/classes";
import {removeHotel} from "../../redux/slices/hotel-slice";

export function useHandleRemoveHotel() {
    const context = useAppContext()
    const dispatch = useAppDispatch()
    const {travel} = useTravel()


    return useCallback(async function (h: Hotel) {
        if (!travel) return
        try {
            const t = new Travel(travel)

            await HotelController.delete(context, h).catch(defaultHandleError)
            dispatch(removeHotel(h))
            t.places_id = t.places_id.filter(id => id !== h.id)
            await TravelController.update(context, t)
            dispatch(updateTravel(t))
        } catch (e) {
            defaultHandleError(e as Error)
        }
    }, [travel, context, dispatch])

}