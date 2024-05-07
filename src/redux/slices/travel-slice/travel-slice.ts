import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {Expense, Hotel, Limit, Member, Message, Place, Section, Travel} from "../../../core/classes";
import {loadTravel} from "./LoadTravelThunk";


export interface TravelSliceStateType {
    travel?: Travel
    places: Place[]
    hotels: Hotel[]
    messages: Message[]
    members: Member[]
    expenses: Expense[]
    limits: Limit[]
    sections: Section[]
    loading: boolean
    error: string
}

const initialState: TravelSliceStateType = {
    places: [],
    hotels: [],
    messages: [],
    members: [],
    expenses: [],
    limits: [],
    sections: [],
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


        addExpense(state, action: PayloadAction<Expense>) {
            const idx = state.expenses.findIndex(p => p.id === action.payload.id)
            idx === -1
                ? state.expenses.push(action.payload)
                : state.expenses[idx] = action.payload
        },
        removeExpense(state, action: PayloadAction<Expense>) {
            state.expenses = state.expenses.filter(p => p.id !== action.payload.id)
        },


        addLimit(state, action: PayloadAction<Limit>) {
            const idx = state.limits.findIndex(p => p.id === action.payload.id)
            idx === -1
                ? state.limits.push(action.payload)
                : state.limits[idx] = action.payload
        },
        removeLimit(state, action: PayloadAction<Limit>) {
            state.limits = state.limits.filter(p => p.id !== action.payload.id)
        },


        addSection(state, action: PayloadAction<Section>) {
            const idx = state.sections.findIndex(p => p.id === action.payload.id)
            idx === -1
                ? state.sections.push(action.payload)
                : state.sections[idx] = action.payload
        },
        removeSection(state, action: PayloadAction<Section>) {
            state.sections = state.sections.filter(p => p.id !== action.payload.id)
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
                state.expenses = action.payload.expenses
                state.limits = action.payload.limits
                state.sections = action.payload.sections
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
    removeHotel,
    addExpense,
    addLimit,
    addSection,
    removeExpense,
    removeSection,
    removeLimit,
} = travelSlice.actions