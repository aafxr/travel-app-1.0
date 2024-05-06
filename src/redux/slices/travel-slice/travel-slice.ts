import {createSlice} from '@reduxjs/toolkit'

import {Hotel, Message, Place, Travel} from "../../../core/classes";
import {loadTravel} from "./LoadTravelThunk";


export interface TravelSliceStateType {
    travel?: Travel
    places: Place[]
    hotels: Hotel[]
    messages: Message[]
    loading: boolean
    error: string
}

const initialState: TravelSliceStateType = {
    places: [],
    hotels: [],
    messages: [],
    loading: false,
    error: ''
}


export const travelSlice = createSlice({
    name: 'travel',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadTravel.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(loadTravel.fulfilled, (state, action) => {
            if(action.payload) {
                state.travel = action.payload.travel
                state.places = action.payload.places
                state.hotels = action.payload.hotels
                state.messages = action.payload.messages
            }
            state.loading = false
        })

        builder.addCase(loadTravel.rejected, (state, action) => {
            state.loading = false
            // state.error = action.meta.arg
        })
    },
})