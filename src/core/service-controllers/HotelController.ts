import {Context} from "../classes/Context";
import {HotelService} from "../services/HotelService";
import {Hotel} from "../classes/store";

export class HotelController{
    static async create(ctx: Context, hotel: Hotel){
        try {
            return await HotelService.create(ctx, hotel)
        }catch (e){
            throw e
        }
    }

    static async read(ctx: Context, hotelID:string){
        try {
            return await HotelService.read(ctx, hotelID)
        }catch (e){
            throw e
        }
    }

    static async readAll(ctx: Context, ...hotelIDs:string[]){
        try {
            return await HotelService.readAll(ctx, ...hotelIDs)
        }catch (e){
            throw e
        }
    }

    static async update(ctx: Context, hotel:Hotel){
        try {
            return await HotelService.update(ctx, hotel)
        }catch (e){
            throw e
        }
    }

    static async delete(ctx: Context, hotel:Hotel){
        try {
            return await HotelService.delete(ctx, hotel)
        }catch (e){
            throw e
        }
    }
}