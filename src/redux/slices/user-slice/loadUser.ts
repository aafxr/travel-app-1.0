import {createAsyncThunk} from "@reduxjs/toolkit";
import {Context} from "../../../core/classes";
import {UserController} from "../../../core/service-controllers";


export type InitUserPayloadType = {
    ctx: Context, userID: string
}


export const loadUser = createAsyncThunk('user/initUser', async ({ctx, userID}: InitUserPayloadType, thunkAPI) => {
    try {
        const user = await UserController.read(ctx, userID)
        return {user}
    }catch (e){
        thunkAPI.abort((e as Error).message)
    }
})