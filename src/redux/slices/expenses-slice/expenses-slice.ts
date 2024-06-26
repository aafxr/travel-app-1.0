import {Expense} from "../../../core/classes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadExpenses} from "./loadExpenses";

export interface ExpensesSliceStateType {
    expenses: Expense[]
    loading: boolean
    error: string
}

const initialState: ExpensesSliceStateType = {
    expenses: [],
    loading: false,
    error: ''
}

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        addExpense(state, action: PayloadAction<Expense>) {
            const id = action.payload.id.split(':').pop() || action.payload.id
            const idx = state.expenses.findIndex(p => p.id.endsWith(id))
            if(idx === -1){
                state.expenses.push(action.payload)
            } else {
                state.expenses = [...state.expenses]
                state.expenses[idx] = action.payload
            }
        },
        removeExpense(state, action: PayloadAction<Expense>) {
            const id = action.payload.id.split(':').pop() || action.payload.id
            state.expenses = state.expenses.filter(p => !p.id.endsWith(id))
        },
    },
    extraReducers: builder => {
        builder.addCase(loadExpenses.pending, state => {
            state.loading = true
        })
        builder.addCase(loadExpenses.fulfilled, (state, action) => {
            if(action.payload){
                state.expenses = action.payload.expenses
            }
            state.loading = false
        })
        builder.addCase(loadExpenses.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message?.toString() || ''
        })
    }
})

export const expensesReducer = expensesSlice.reducer
export const {addExpense, removeExpense} = expensesSlice.actions