import {createAsyncThunk} from "@reduxjs/toolkit";
import {Context, Travel} from "../../../core/classes";
import {MessageController} from "../../../core/service-controllers";

export type LoadMessagesThunkPropsType = {
    travel: Travel
    ctx: Context
}

export const loadMessages = createAsyncThunk('places/loadMessages', async ({ctx, travel}: LoadMessagesThunkPropsType, thunkAPI) => {
    try {
        const messages = await MessageController.readAllByTravelID(ctx, travel.id)
        return {messages}
    }catch (e){
        thunkAPI.abort((e as Error).message )
    }
})