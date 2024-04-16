import {Context} from "../classes/Context";
import {Action} from "../classes/store";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {Place} from "../classes/store/Place";
import {DB} from "../db/DB";
import {PlaceError} from "../errors/PlaceError";
import {sendActions} from "../../api/fetch/sendActions";
import {ActionDto} from "../classes/dto";
import {NetworkError, TravelError} from "../errors";
import {fetchPlaceByID} from "../../api/fetch";
import {Compare} from "../classes/Compare";
import {TravelService} from "./TravelService";
import {CustomError} from "../errors/CustomError";
import {ErrorCode} from "../errors/ErrorCode";

export class PlaceService{

    static async create(ctx: Context, place: Place){
        const travelID = place.id.split(':')[1]
        if(!travelID) throw PlaceError.unbindedPlace()

        const travel = await TravelService.read(ctx, travelID)
        if(!travel) throw TravelError.unexpectedTravelId(travelID)

        const action = new Action({
            action:ActionType.ADD,
            entity: StoreName.PLACE,
            data: place
        })

        try {
            await DB.add(StoreName.PLACE, place)
        }catch (e){
            throw PlaceError.placeAlreadyExist(place)
        }

        try {
            travel.places_id.push(place.id)
            await TravelService.update(ctx, travel)
        } catch (e){
            if(e instanceof CustomError && e.code === ErrorCode.NETWORK_ERROR){}
            else throw e
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
        return place
    }

    static async read(ctx: Context, placeID:string){
        let place = await DB.getOne<Place>(StoreName.PLACE, placeID)
        if (place) return

        const id = placeID.split(':').pop()
        if(id !== undefined) {
            const response = await fetchPlaceByID(id)
            if(response.ok){
                place = new Place(response.data)
                await DB.add(StoreName.PLACE, place)
                return place
            }
        }
    }

    static async readAll(ctx: Context, ...placeIDs:string[]){
        const places = []
        for (const placeID of placeIDs){
            try {
                const place = await PlaceService.read(ctx, placeID)
                if(place) places.push(place)
            } catch (e){
                console.error(e)
            }
        }
        return places
    }

    static async update(ctx: Context, place: Place){
        const ext = await DB.getOne<Place>(StoreName.PLACE, place.id) || new Place({})
        const dif = Compare.place(ext, place)
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
        return place
    }

    static async delete(ctx: Context, place: Place){
        const travelID = place.id.split(':')[1]
        if(!travelID) throw PlaceError.unbindedPlace()

        const travel = await TravelService.read(ctx, travelID)
        if(!travel) throw TravelError.unexpectedTravelId(travelID)

        const {id} = place
        const action = new Action({
            action:ActionType.UPDATE,
            entity: StoreName.PLACE,
            data: {id}
        })

        try {
            travel.places_id = travel.places_id.filter(id => id !== place.id)
            await TravelService.update(ctx, travel)
        } catch (e){
            if(e instanceof CustomError && e.code === ErrorCode.NETWORK_ERROR){}
            else throw e
        }

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
        return place
    }
}