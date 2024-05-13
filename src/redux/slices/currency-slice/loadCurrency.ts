import {Context} from "../../../core/classes";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {CurrencyController} from "../../../core/service-controllers/CurrencyController";


export type LoadCurrencyPayloadType = {
    ctx: Context
    from: Date
    to: Date
}

export const loadCurrency = createAsyncThunk('currency/loadCurrency', async ({ctx, from, to}: LoadCurrencyPayloadType, thunkAPI) => {
    try {
        const list = await CurrencyController.readByRange(ctx, from, to)
        return {list}
    }catch (e){
        thunkAPI.abort((e as Error).message)
    }
})