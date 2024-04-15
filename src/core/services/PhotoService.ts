import {sendActions} from "../../api/fetch/sendActions";
import {NetworkError, PhotoError} from "../errors";
import {Action, Context, Photo} from "../classes";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {ActionDto} from "../classes/dto";
import {DB} from "../db/DB";

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
        await DB.add(StoreName.ACTION, action)
        try {
            const dto = new ActionDto(action)
            const result = await sendActions(dto)
            if(result.response.ok && result.response.result[action.id]?.ok){
                action.synced = 1
                await DB.update(StoreName.ACTION, action)
            }
        } catch (e){
            throw NetworkError.connectionError()
        }
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
        await DB.add(StoreName.ACTION, action)

        try {
            const dto = new ActionDto(action)
            const result = await sendActions(dto)
            if(result.response.ok && result.response.result[action.id]?.ok){
                action.synced = 1
                await DB.update(StoreName.ACTION, action)
            }
        } catch (e){
            throw NetworkError.connectionError()
        }
        return photo
    }

    static async delete(ctx: Context, photo: Photo){
        const action = new Action({
            action:ActionType.ADD,
            entity: StoreName.UPDATE,
            data: {id: photo.id}
        })

        await DB.delete(StoreName.Photo, photo.id)
        await DB.add(StoreName.ACTION, action)

        try {
            const dto = new ActionDto(action)
            const result = await sendActions(dto)
            if(result.response.ok && result.response.result[action.id]?.ok){
                action.synced = 1
                await DB.update(StoreName.ACTION, action)
            }
        } catch (e){
            throw NetworkError.connectionError()
        }
        return photo
    }

}