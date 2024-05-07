import {createAsyncThunk} from "@reduxjs/toolkit";

import {
    ExpenseController,
    HotelController,
    LimitController,
    MemberController,
    PlaceController,
    TravelController
} from "../../../core/service-controllers";
import {MessageController} from "../../../core/service-controllers/MessageController";
import {TravelError} from "../../../core/errors";
import {Context, Place, Travel} from "../../../core/classes";
import {SectionController} from "../../../core/service-controllers/SectionController";

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
        const members = await MemberController.readAll(ctx, ...Travel.getMembers(travel))

        const expenses = await ExpenseController.readByTravelID(ctx, travelID)
        const limits = await LimitController.readAllByTravelID(ctx, travelID)
        const sections = await SectionController.readAll(ctx)

        return { travel, places, hotels, messages, members, expenses, limits, sections }

    }catch (e){
        thunkAPI.abort((e as Error).message )
    }
})