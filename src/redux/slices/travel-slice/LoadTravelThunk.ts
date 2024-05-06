import {createAsyncThunk} from "@reduxjs/toolkit";

import {HotelController, PlaceController, TravelController} from "../../../core/service-controllers";
import {MessageController} from "../../../core/service-controllers/MessageController";
import {TravelError} from "../../../core/errors";
import {Context} from "../../../core/classes";

export type LoadTravelThunkPropsType = {
    travelID: string
    ctx: Context
}

export const loadTravel = createAsyncThunk('travel/loadTravel', async ({travelID, ctx}: LoadTravelThunkPropsType, thunkAPI) => {
    try {
        const travel = await TravelController.read(ctx, travelID)
        if(!travel) {
            thunkAPI.abort(TravelError.unexpectedTravelId(travelID).message)
            return
        }
        const places = await PlaceController.readAll(ctx, ...travel.places_id)
        const hotels = await  HotelController.readAll(ctx, ...travel.hotels_id)
        const messages = await  MessageController.readAllByTravelID(ctx, travelID)

    }
})