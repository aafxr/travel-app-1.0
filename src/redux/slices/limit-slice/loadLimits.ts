import {Context, Travel} from "../../../core/classes";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {LimitController} from "../../../core/service-controllers";

export type LoadLimitsThunkPropsType = {
    travel: Travel
    ctx: Context
}

export const loadLimits = createAsyncThunk('places/loadLimits', async ({ctx, travel}: LoadLimitsThunkPropsType, thunkAPI) => {
    try {
        const limits = await LimitController.readAllByTravelID(ctx, travel.id)
        return {limits}
    }catch (e){
        thunkAPI.abort((e as Error).message )
    }
})