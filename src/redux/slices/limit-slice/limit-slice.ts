import {Limit} from "../../../core/classes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadLimits} from "./loadLimits";

export interface LimitsSliceStateType {
    limits: Limit[]
    loading: boolean
    error: string
}

const initialState: LimitsSliceStateType = {
    limits: [],
    loading: false,
    error: ''
}

const limitSlice = createSlice({
    name: 'limits',
    initialState,
    reducers: {
        addLimit(state, action: PayloadAction<Limit>) {
            const idx = state.limits.findIndex(p => p.id === action.payload.id)
            idx === -1
                ? state.limits.push(action.payload)
                : state.limits[idx] = action.payload
        },
        removeLimit(state, action: PayloadAction<Limit>) {
            state.limits = state.limits.filter(p => p.id !== action.payload.id)
        },
    },
    extraReducers: builder => {
        builder.addCase(loadLimits.pending, state => {
            state.loading = true
        })
        builder.addCase(loadLimits.fulfilled, (state, action) => {
            if(action.payload){
                state.limits = action.payload.limits
            }
            state.loading = false
        })
        builder.addCase(loadLimits.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message?.toString() || ''
        })
    }
})


export const limitsReducer = limitSlice.reducer
export const {addLimit, removeLimit} = limitSlice.actions