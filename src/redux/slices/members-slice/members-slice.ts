import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Member} from "../../../core/classes";
import {loadMembers} from "./loadMembers";

export interface MembersSliceStateType {
    members: Member[]
    loading: boolean
    error: string
}

const initialState: MembersSliceStateType = {
    members: [],
    loading: false,
    error: ''
}

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
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
    extraReducers: builder => {
        builder.addCase(loadMembers.pending, state => {
            state.loading = true
        })
        builder.addCase(loadMembers.fulfilled, (state, action) => {
            if(action.payload){
                state.members = action.payload.messages
            }
            state.loading = false
        })
        builder.addCase(loadMembers.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message?.toString() || ''
        })
    }
})

export const membersReducer = membersSlice.reducer
export const {addMember, removeMember} = membersSlice.actions