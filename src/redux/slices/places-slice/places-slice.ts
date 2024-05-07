import {Place} from "../../../core/classes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadPlaces} from "./loadPlaces";

export interface PlacesSliceStateType {
    places: Place[]
    loading: boolean
    error: string
}

const initialState: PlacesSliceStateType = {
    places: [],
    loading: false,
    error: ''
}

const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        addPlace(state, action: PayloadAction<Place>) {
            const idx = state.places.findIndex(p => p.id === action.payload.id)
            idx === -1
                ? state.places.push(action.payload)
                : state.places[idx] = action.payload
        },
        removePlace(state, action: PayloadAction<Place>) {
            state.places = state.places.filter(p => p.id !== action.payload.id)
        },
    },
    extraReducers: builder => {
        builder.addCase(loadPlaces.pending, state => {
            state.loading = true
        })
        builder.addCase(loadPlaces.fulfilled, (state, action) => {
            if(action.payload){
                state.places = action.payload.places
            }
            state.loading = false
        })
        builder.addCase(loadPlaces.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message?.toString() || ''
        })
    }
})


export const placesReducer = placesSlice.reducer
export const {addPlace, removePlace} = placesSlice.actions