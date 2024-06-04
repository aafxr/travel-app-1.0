import {createAsyncThunk} from "@reduxjs/toolkit";

import {ExpenseController, TravelController} from "../../../core/service-controllers";
import {TravelError} from "../../../core/errors";
import {Context} from "../../../core/classes";
import {loadPlaces} from "../places-slice";
import {loadHotels} from "../hotel-slice";
import {loadMembers} from "../members-slice";
import {loadMessages} from "../messages-slice";
import {loadExpenses} from "../expenses-slice";
import {loadLimits} from "../limit-slice";
import {loadSections} from "../sections-slice";
import {loadCurrency} from "../currency-slice";

export type LoadTravelThunkPropsType = {
    travelID: string
    ctx: Context
}

export const loadTravel = createAsyncThunk('travel/loadTravel', async ({
                                                                           travelID,
                                                                           ctx
                                                                       }: LoadTravelThunkPropsType, thunkAPI) => {
    try {
        const travel = await TravelController.read(ctx, travelID)
        if (!travel) {
            thunkAPI.abort(TravelError.unexpectedTravelId(travelID).message)
            return
        }

        const dispatch = thunkAPI.dispatch
        dispatch(loadPlaces({ctx, travel}))
        dispatch(loadHotels({ctx, travel}))
        dispatch(loadMembers({ctx, travel}))
        dispatch(loadMessages({ctx, travel}))
        dispatch(loadExpenses({ctx, travel}))
        dispatch(loadLimits({ctx, travel}))
        dispatch(loadSections({ctx, travel}))


        let from = new Date(travel.date_start)
        let to = new Date(travel.date_end)

        let expensesList = await ExpenseController.readByTravelID(ctx, travelID)
        if (expensesList.length) {
            expensesList = expensesList.sort((a, b) => a.created_at.getTime() - b.created_at.getTime())
            if (expensesList[0].created_at.getTime() < from.getTime()) {
                from = new Date(expensesList[0].created_at)
            }
            if (expensesList[expensesList.length - 1].created_at.getTime() > to.getTime()) {
                to = new Date(expensesList[expensesList.length - 1].created_at)
            }

        }

        dispatch(loadCurrency({ctx, from, to}))

        return {travel}

    } catch (e) {
        thunkAPI.abort((e as Error).message)
    }
})