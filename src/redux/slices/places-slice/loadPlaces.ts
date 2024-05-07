import {createAsyncThunk} from "@reduxjs/toolkit";
import {Context, Travel} from "../../../core/classes";
import {PlaceController} from "../../../core/service-controllers";

export type LoadPlacesThunkPropsType = {
    travel: Travel
    ctx: Context
}

export const loadPlaces = createAsyncThunk('places/loadPlaces', async ({ctx, travel}: LoadPlacesThunkPropsType, thunkAPI) => {
    try {
        const places = await PlaceController.readAll(ctx, ...travel.places_id)
        return {places}
    }catch (e){
        thunkAPI.abort((e as Error).message )
    }
})