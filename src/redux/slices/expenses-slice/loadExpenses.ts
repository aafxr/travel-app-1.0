import {Context, Travel} from "../../../core/classes";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ExpenseController} from "../../../core/service-controllers";

export type LoadExpensesThunkPropsType = {
    travel: Travel
    ctx: Context
}

export const loadExpenses = createAsyncThunk('places/loadExpenses', async ({ctx, travel}: LoadExpensesThunkPropsType, thunkAPI) => {
    try {
        const expenses = await ExpenseController.readByTravelID(ctx, travel.id)
        return {expenses}
    }catch (e){
        thunkAPI.abort((e as Error).message )
    }
})