import { createSlice } from '@reduxjs/toolkit'

import {Hotel, Message, Place, Travel} from "../../../core/classes";
import {boolean} from "joi";


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
    extraReducers: (builder) => {

    },
})