import {Hotel} from "../../../core/classes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadHotels} from "./loadHotels";

export interface HotelsSliceStateType {
    hotels: Hotel[]
    loading: boolean
    error: string
}

const initialState: HotelsSliceStateType = {
    hotels: [],
    loading: false,
    error: ''
}

const hotelSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {
        addHotel(state, action: PayloadAction<Hotel>) {
            const idx = state.hotels.findIndex(p => p.id === action.payload.id)
            if(idx === -1) {
                 state.hotels.push(action.payload)
            } else {
                state.hotels = [...state.hotels]
                state.hotels[idx] = action.payload
            }

        },
        removeHotel(state, action: PayloadAction<Hotel>) {
            state.hotels = state.hotels.filter(p => p.id !== action.payload.id)
        },
    },
    extraReducers: builder => {
        builder.addCase(loadHotels.pending, state => {
            state.loading = true
        })
        builder.addCase(loadHotels.fulfilled, (state, action) => {
            if(action.payload){
                state.hotels = action.payload.hotels
            }
            state.loading = false
        })
        builder.addCase(loadHotels.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message?.toString() || ''
        })
    }
})

export const hotelsReducer = hotelSlice.reducer
export const {addHotel, removeHotel} = hotelSlice.actions