import {Context} from "../Context";
import {Hotel} from "../store";
import {Action} from "../store";
import {ActionType} from "../../../types/ActionType";
import {StoreName} from "../../../types/StoreName";
import {DB} from "../../db/DB";
import {HotelError} from "../../errors";
import {ActionDto} from "../dto";
import {sendActions} from "../../../api/fetch/sendActions";
import {NetworkError} from "../../errors";
import {fetchHotelByID} from "../../../api/fetch";
import {Compare} from "../Compare";

export class HotelService{
    static async create(ctx: Context, hotel: Hotel){
        const action = new Action({
            action:ActionType.ADD,
            entity: StoreName.PLACE,
            data: hotel
        })

        try {
            await DB.add(StoreName.PLACE, hotel)
        }catch (e){
            throw HotelError.hotelAlreadyExist(hotel)
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
        return hotel
    }

    static async read(ctx: Context, hotelID:string){
        let hotel = await DB.getOne<Hotel>(StoreName.PLACE, hotelID)
        if (hotel) return

        const id = hotelID.split(':').pop()
        if(id !== undefined) {
            const response = await fetchHotelByID(id)
            if(response.ok){
                hotel = new Hotel(response.data)
                await DB.add(StoreName.PLACE, hotel)
                return hotel
            }
        }
    }

    static async readAll(ctx: Context, ...hotelIDs:string[]){
        const hotels = []
        for (const hotelID of hotelIDs){
            try {
                const hotel = await HotelService.read(ctx, hotelID)
                if(hotel) hotels.push(hotel)
            } catch (e){
                console.error(e)
            }
        }
        return hotels
    }

    static async update(ctx: Context, hotel: Hotel){
        const ext = await DB.getOne<Hotel>(StoreName.PLACE, hotel.id) || new Hotel({})
        const dif = Compare.hotel(ext, hotel)
        const action = new Action({
            action:ActionType.UPDATE,
            entity: StoreName.PLACE,
            data: dif
        })

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
        return hotel
    }

    static async delete(ctx: Context, hotel: Hotel){
        const {id} = hotel
        const action = new Action({
            action:ActionType.UPDATE,
            entity: StoreName.PLACE,
            data: {id}
        })

        await DB.delete(StoreName.PLACE, id)
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
        return hotel
    }
}