import {createAsyncThunk} from "@reduxjs/toolkit";
import {Context, Travel} from "../../../core/classes";
import {SectionController} from "../../../core/service-controllers";

export type LoadSectionsThunkPropsType = {
    travel: Travel
    ctx: Context
}

export const loadSections = createAsyncThunk('places/loadSections', async ({ctx, travel}: LoadSectionsThunkPropsType, thunkAPI) => {
    try {
        const sections = await SectionController.readAll(ctx)
        return {sections}
    }catch (e){
        thunkAPI.abort((e as Error).message )
    }
})