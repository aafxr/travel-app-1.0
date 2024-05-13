import {User} from "../../../core/classes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadUser} from "./loadUser";

export interface UserSliceStateType {
    user?: User
    loading: boolean
    error: string
}

const initialState: UserSliceStateType = {
    loading: false,
    error: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>){
            state.user = action.payload
        },

        removeUser(state){
            state.user = undefined
        }
    },
    extraReducers: builder => {
        builder.addCase(loadUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(loadUser.fulfilled, (state, action) => {
            if(action.payload){
                state.user = action.payload.user
            }
            state.loading = false
        })
        builder.addCase(loadUser.rejected, (state, action) => {
            state.error = action.error.message || ''
            state.loading = false
        })

    }
})

export const userReducer = userSlice.reducer
export const {setUser, removeUser} = userSlice.actions