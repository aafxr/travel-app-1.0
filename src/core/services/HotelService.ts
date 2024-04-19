import {Action, Compare, Context, Hotel} from "../classes";
import {HotelError, TravelError} from "../errors";
import {ActionType} from "../../types/ActionType";
import {CustomError} from "../errors/CustomError";
import {StoreName} from "../../types/StoreName";
import {fetchHotelByID} from "../../api/fetch";
import {TravelService} from "./TravelService";
import {ErrorCode} from "../errors/ErrorCode";
import {ActionService} from "./ActionService";
import {DB} from "../db/DB";

export class HotelService{
    static async create(ctx: Context, hotel: Hotel){
        const travelID = hotel.id.split(':')[1]
        if(!travelID) throw HotelError.unbindedHotel()

        const travel = await TravelService.read(ctx, travelID)
        if(!travel) throw TravelError.unexpectedTravelId(travelID)

        const action = new Action({
            action:ActionType.ADD,
            entity: StoreName.HOTELS,
            data: hotel
        })

        try {
            travel.hotels_id.push(hotel.id)
            await TravelService.update(ctx, travel)
        } catch (e){
            if(e instanceof CustomError && e.code === ErrorCode.NETWORK_ERROR){}
            else throw e
        }

        try {
            await DB.add(StoreName.HOTELS, hotel)
        }catch (e){
            throw HotelError.hotelAlreadyExist(hotel)
        }
        await ActionService.create(ctx, action)
        return hotel
    }

    static async read(ctx: Context, hotelID:string){
        let hotel = await DB.getOne<Hotel>(StoreName.HOTELS, hotelID)
        if (hotel) return hotel

        const id = hotelID.split(':').pop()
        if(id !== undefined) {
            const response = await fetchHotelByID(id)
            if(response.ok){
                hotel = new Hotel(response.data)
                await DB.add(StoreName.HOTELS, hotel)
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
        const ext = await DB.getOne<Hotel>(StoreName.HOTELS, hotel.id) || new Hotel({})
        const dif = Compare.hotel(ext, hotel)
        const action = new Action({
            action:ActionType.UPDATE,
            entity: StoreName.HOTELS,
            data: dif
        })

        await ActionService.create(ctx, action)
        return hotel
    }

    static async delete(ctx: Context, hotel: Hotel){
        const travelID = hotel.id.split(':')[1]
        if(!travelID) throw HotelError.unbindedHotel()

        const travel = await TravelService.read(ctx, travelID)
        if(!travel) throw TravelError.unexpectedTravelId(travelID)

        const {id} = hotel
        const action = new Action({
            action:ActionType.UPDATE,
            entity: StoreName.HOTELS,
            data: {id}
        })

        try {
            travel.hotels_id = travel.hotels_id.filter(id => id !== hotel.id)
            await TravelService.update(ctx, travel)
        } catch (e){
            if(e instanceof CustomError && e.code === ErrorCode.NETWORK_ERROR){}
            else throw e
        }

        await DB.delete(StoreName.HOTELS, id)
        await ActionService.create(ctx, action)
        return hotel
    }
}