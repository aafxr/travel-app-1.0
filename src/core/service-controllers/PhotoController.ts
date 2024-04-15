import {Photo} from "../classes";
import {Context} from "../classes";
import {PhotoService} from "../services";

export class PhotoController{
    static async create(ctx: Context, photo: Photo){
        try {
            return await PhotoService.create(ctx, photo)
        }catch (e){
            throw e
        }
    }

    static async read(ctx: Context, photoID: string){
        try {
            return await PhotoService.read(ctx, photoID)
        }catch (e){
            throw e
        }
    }

    static async readAll(ctx: Context, ...photoIDs:string[]){
        try {
            return await PhotoService.readAll(ctx, ...photoIDs)
        }catch (e){
            throw e
        }
    }

    static async update(ctx: Context, photo:Photo){
        try {
            return await PhotoService.update(ctx, photo)
        }catch (e){
            throw e
        }
    }

    static async delete(ctx: Context, photo:Photo){
        try {
            return await PhotoService.delete(ctx, photo)
        }catch (e){
            throw e
        }
    }
}