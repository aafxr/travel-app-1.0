import {PhotoError} from "../errors";
import {Action, Context, Photo} from "../classes";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {DB} from "../db/DB";
import {ActionService} from "./ActionService";

export class PhotoService{
    static async create(ctx: Context, photo: Photo){
        const action = new Action({
            action:ActionType.ADD,
            entity: StoreName.Photo,
            data: photo
        })

        try {
            await DB.add(StoreName.Photo, photo)
        }catch (e){
            throw PhotoError.photoAlreadyExist(photo)
        }
        await ActionService.create(ctx, action)
        return photo
    }

    static async read(ctx: Context, photoID: string){
        return await DB.getOne<Photo>(StoreName.Photo, photoID)
    }

    static async readAll(ctx: Context, ...photoIDs: string[]){
        const photos = []
        for (const id of photoIDs){
            const photo = await DB.getOne(StoreName.Photo, id)
            if(photo) photos.push(photo)
        }
        return photos
    }

    static async update(ctx: Context, photo: Photo){
        const action = new Action({
            action:ActionType.ADD,
            entity: StoreName.UPDATE,
            data: photo
        })

        await DB.update(StoreName.Photo, photo)

        await ActionService.create(ctx, action)
        return photo
    }

    static async delete(ctx: Context, photo: Photo){
        const action = new Action({
            action:ActionType.ADD,
            entity: StoreName.UPDATE,
            data: {id: photo.id}
        })

        await DB.delete(StoreName.Photo, photo.id)

        await ActionService.create(ctx, action)
        return photo
    }

}