import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {Hotel, Member, Message, Place, Travel} from "../../../core/classes";
import {loadTravel} from "./LoadTravelThunk";


export interface TravelSliceStateType {
    travel?: Travel
    places: Place[]
    hotels: Hotel[]
    messages: Message[]
    members: Member[]
    loading: boolean
    error: string
}

const initialState: TravelSliceStateType = {
    places: [],
    hotels: [],
    messages: [],
    members: [],
    loading: false,
    error: ''
}


export const travelSlice = createSlice({
    name: 'travel',
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

        addHotel(state, action: PayloadAction<Hotel>) {
            const idx = state.hotels.findIndex(p => p.id === action.payload.id)
            idx === -1
                ? state.hotels.push(action.payload)
                : state.hotels[idx] = action.payload
        },
        removeHotel(state, action: PayloadAction<Hotel>) {
            state.hotels = state.hotels.filter(p => p.id !== action.payload.id)
        },

        addMessage(state, action: PayloadAction<Message>) {
            const idx = state.messages.findIndex(p => p.id === action.payload.id)
            idx === -1
                ? state.messages.push(action.payload)
                : state.messages[idx] = action.payload
        },
        removeMessage(state, action: PayloadAction<Message>) {
            state.messages = state.messages.filter(p => p.id !== action.payload.id)
        },

        addMember(state, action: PayloadAction<Member>) {
            const idx = state.members.findIndex(p => p.id === action.payload.id)
            idx === -1
                ? state.members.push(action.payload)
                : state.members[idx] = action.payload
        },
        removeMember(state, action: PayloadAction<Member>) {
            state.members = state.members.filter(p => p.id !== action.payload.id)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadTravel.pending, (state, action) => {
            state.loading = true
        })

        builder.addCase(loadTravel.fulfilled, (state, action) => {
            if (action.payload) {
                state.travel = action.payload.travel
                state.places = action.payload.places
                state.hotels = action.payload.hotels
                state.messages = action.payload.messages
                state.members = action.payload.members
            }
            state.loading = false
        })

        builder.addCase(loadTravel.rejected, (state, action) => {
            state.loading = false
            // state.error = action.meta.arg
        })
    },
})


export const travelReducer = travelSlice.reducer
export const {
    addMember,
    addMessage,
    addHotel,
    addPlace,
    removeMember,
    removeMessage,
    removePlace,
    removeHotel
} = travelSlice.actions