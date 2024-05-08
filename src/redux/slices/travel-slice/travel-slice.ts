import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {Travel} from "../../../core/classes";
import {loadTravel} from "./LoadTravelThunk";


export interface TravelSliceStateType {
    travel?: Travel
    loading: boolean
    error: string
}

const initialState: TravelSliceStateType = {
    loading: false,
    error: ''
}


export const travelSlice = createSlice({
    name: 'travel',
    initialState,
    reducers: {
        updateTravel(state, action:PayloadAction<Travel>){
            state.travel = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadTravel.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(loadTravel.fulfilled, (state, action) => {
            if (action.payload) {
                state.travel = action.payload.travel
            }
            state.loading = false
        })

        builder.addCase(loadTravel.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message?.toString() || ''
        })
    },
})


export const travelReducer = travelSlice.reducer
export const {updateTravel} = travelSlice.actions