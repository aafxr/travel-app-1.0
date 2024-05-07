import {Section} from "../../../core/classes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadSections} from "./loadSections";

export interface SectionsSliceStateType {
    sections: Section[]
    loading: boolean
    error: string
}

const initialState: SectionsSliceStateType = {
    sections: [],
    loading: false,
    error: ''
}


const sectionsSlice = createSlice({
    name: 'sections',
    initialState,
    reducers: {
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
    extraReducers: builder => {
        builder.addCase(loadSections.pending, state => {
            state.loading = true
        })
        builder.addCase(loadSections.fulfilled, (state, action) => {
            if(action.payload){
                state.sections = action.payload.sections
            }
            state.loading = false
        })
        builder.addCase(loadSections.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message?.toString() || ''
        })
    }
})

export const sectionsReducer = sectionsSlice.reducer
export const {addSection, removeSection} = sectionsSlice.actions