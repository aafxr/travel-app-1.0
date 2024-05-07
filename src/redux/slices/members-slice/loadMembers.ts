import {Context, Travel} from "../../../core/classes";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {MemberController} from "../../../core/service-controllers";

export type LoadMembersThunkPropsType = {
    travel: Travel
    ctx: Context
}

export const loadMembers = createAsyncThunk('places/loadMembers', async ({ctx, travel}: LoadMembersThunkPropsType, thunkAPI) => {
    try {
        const messages = await MemberController.readAll(ctx, ...Travel.getMembers(travel))
        return {messages}
    }catch (e){
        thunkAPI.abort((e as Error).message )
    }
})