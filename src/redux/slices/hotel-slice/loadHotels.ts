import {createAsyncThunk} from "@reduxjs/toolkit";
import {Context, Travel} from "../../../core/classes";
import {HotelController} from "../../../core/service-controllers";

export type LoadHotelsThunkPropsType = {
    travel: Travel
    ctx: Context
}

export const loadHotels = createAsyncThunk('places/loadHotels', async ({ctx, travel}: LoadHotelsThunkPropsType, thunkAPI) => {
    try {
        const hotels = await HotelController.readAll(ctx, ...travel.hotels_id)
        return {hotels}
    }catch (e){
        thunkAPI.abort((e as Error).message )
    }
})