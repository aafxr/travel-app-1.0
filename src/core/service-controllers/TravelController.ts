import {Travel} from "../classes/store";
import {Context} from "../classes/Context";
import {TravelService} from "../services/TravelService";

export class TravelController{
    static async create(ctx: Context, travel:Travel){
        try {
            return await TravelService.create(ctx, travel)
        }catch (e){
            throw e
        }
    }

    static async read(ctx: Context, travelID:string){
        try {
            return await TravelService.read(ctx, travelID)
        }catch (e){
            throw e
        }
    }

    static async readAll(ctx: Context, ...travelIDs:string[]){
        try {
            return await TravelService.readAll(ctx, ...travelIDs)
        }catch (e){
            throw e
        }
    }

    static async getList(ctx: Context){
        try {
            return await TravelService.getList(ctx)
        }catch (e){
            throw e
        }
    }

    static async update(ctx: Context, travel:Travel){
        try {
            return await TravelService.update(ctx, travel)
        }catch (e){
            throw e
        }
    }

    static async delete(ctx: Context, travel:Travel){
        try {
            return await TravelService.delete(ctx, travel)
        }catch (e){
            throw e
        }
    }
}