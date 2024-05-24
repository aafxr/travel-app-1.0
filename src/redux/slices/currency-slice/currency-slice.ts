import {Currency} from "../../../core/classes/store/Currency";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadCurrency} from "./loadCurrency";
import {CurrencyConvertor} from "../../../core/classes";

type CurrencySliceStateType = {
    convertor: CurrencyConvertor
    list: Currency[]
    loading: boolean
    error: string
}

const initialState: CurrencySliceStateType = {
    convertor: new CurrencyConvertor([]),
    list: [],
    loading: false,
    error: '',
}

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        addCurrency(state, action: PayloadAction<Currency>){
            const c =action.payload
            const idx = state.list.findIndex(_c => _c.date.getTime() === c.date.getTime())
            if(idx === -1) state.list.push(c)
        },


    },
    extraReducers: builder => {
        builder.addCase(loadCurrency.pending, (state) => {
            state.loading = true
        })

        builder.addCase(loadCurrency.fulfilled, (state, action) => {
            if(action.payload){
                state.list = action.payload.list
                state.convertor = action.payload.convertor
            }
            state.loading = false
        })

        builder.addCase(loadCurrency.rejected, (state, action) => {
            state.loading = false
            state.list = []
            state.error = action.error.message || 'fail load currency list'
        })
    }
})

export const currencyReducer = currencySlice.reducer
export const {addCurrency} = currencySlice.actions