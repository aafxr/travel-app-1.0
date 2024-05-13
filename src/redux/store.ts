import { configureStore } from '@reduxjs/toolkit'
import {travelReducer} from "./slices/travel-slice";
import {placesReducer} from "./slices/places-slice";
import {hotelsReducer} from "./slices/hotel-slice";
import {messagesReducer} from "./slices/messages-slice";
import {membersReducer} from "./slices/members-slice";
import {expensesReducer} from "./slices/expenses-slice";
import {limitsReducer} from "./slices/limit-slice";
import {sectionsReducer} from "./slices/sections-slice";
import {userReducer} from "./slices/user-slice";
import {currencyReducer} from "./slices/currency-slice";

export const store = configureStore({
    reducer: {
        travel: travelReducer,
        places: placesReducer,
        hotels: hotelsReducer,
        messages: messagesReducer,
        members: membersReducer,
        expenses: expensesReducer,
        limits: limitsReducer,
        sections: sectionsReducer,
        user: userReducer,
        currency: currencyReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
