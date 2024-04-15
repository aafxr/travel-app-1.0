import {Context} from "../Context";
import {PlaceService} from "../services";
import {Place} from "../store";

export class PlaceController{
    static async create(ctx: Context, place: Place){
        try {
            return await PlaceService.create(ctx, place)
        }catch (e){
            throw e
        }
    }

    static async read(ctx: Context, placeID:string){
        try {
            return await PlaceService.read(ctx, placeID)
        }catch (e){
            throw e
        }
    }

    static async readAll(ctx: Context, ...placeIDs:string[]){
        try {
            return await PlaceService.readAll(ctx, ...placeIDs)
        }catch (e){
            throw e
        }
    }

    static async update(ctx: Context, place:Place){
        try {
            return await PlaceService.update(ctx, place)
        }catch (e){
            throw e
        }
    }

    static async delete(ctx: Context, place:Place){
        try {
            return await PlaceService.delete(ctx, place)
        }catch (e){
            throw e
        }
    }
}