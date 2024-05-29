import {Message} from "../../../core/classes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadMessages} from "./loadMessages";

export interface MessagesSliceStateType {
    messages: Message[]
    loading: boolean
    error: string
}

const initialState: MessagesSliceStateType = {
    messages: [],
    loading: false,
    error: ''
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<Message>) {
            const idx = state.messages.findIndex(p => p.id === action.payload.id)
            if(idx === -1){
                state.messages.push(action.payload)
            } else {
                state.messages = [...state.messages]
                state.messages[idx] = action.payload
            }
        },
        removeMessage(state, action: PayloadAction<Message>) {
            state.messages = state.messages.filter(p => p.id !== action.payload.id)
        },
    },
    extraReducers: builder => {
        builder.addCase(loadMessages.pending, state => {
            state.loading = true
        })
        builder.addCase(loadMessages.fulfilled, (state, action) => {
            if(action.payload){
                state.messages = action.payload.messages
            }
            state.loading = false
        })
        builder.addCase(loadMessages.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message?.toString() || ''
        })
    }
})

export const messagesReducer = messagesSlice.reducer
export const {addMessage, removeMessage} = messagesSlice.actions