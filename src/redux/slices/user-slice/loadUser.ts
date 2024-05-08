import {createAsyncThunk} from "@reduxjs/toolkit";
import {Context} from "../../../core/classes";
import {UserController} from "../../../core/service-controllers";


export type InitUserPayloadType = {
    ctx: Context
}


export const loadUser = createAsyncThunk('user/initUser', async ({ctx}: InitUserPayloadType, thunkAPI) => {
    try {
        const user = await UserController.getLoggedInUser(ctx)
        return {user}
    }catch (e){
        thunkAPI.abort((e as Error).message)
    }
})