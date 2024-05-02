import {CustomError} from "../errors/CustomError";
import {ErrorCode} from "../errors/ErrorCode";
import {Context, Limit} from "../classes";
import {LimitService} from "../services";

export class LimitController{
    static async create(ctx: Context, limit: Limit){
        try {
            return await LimitService.create(ctx,limit)
        }catch (e){
            throw e
        }
    }

    static async read(ctx: Context, limitID:string){
        try {
            return await LimitService.read(ctx, limitID)
        }catch (e){
            throw e
        }
    }


    static async readAll(ctx: Context, ...limitIDs:string[]){
        try {
            return await LimitService.readAll(ctx, ...limitIDs)
        }catch (e){
            throw e
        }
    }


    static async readAllByTravelID(ctx: Context, travelID:string){
        try {
            return await LimitService.readAllByTravelID(ctx, travelID)
        }catch (e){
            throw e
        }
    }


    static async update(ctx: Context, limit:Limit){
        try {
            return await LimitService.update(ctx, limit)
        }catch (e){
            if(e instanceof CustomError && e.code === ErrorCode.UPDATING_LIMIT_NOT_EXIST){
                return await LimitController.create(ctx, limit)
            }
            throw e
        }
    }

    static async delete(ctx: Context, limit:Limit){
        try {
            return LimitService.delete(ctx, limit)
        }catch (e){
            throw e
        }
    }
}