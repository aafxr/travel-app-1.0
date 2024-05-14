import {Action, Compare, Context, Place} from "../classes";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {PlaceError, TravelError} from "../errors";
import {fetchPlaceByID} from "../../api/fetch";
import {TravelService} from "./TravelService";
import {ActionService} from "./ActionService";
import {DB} from "../db/DB";

export class PlaceService{

    static async create(ctx: Context, place: Place){
        const travelID = place.id.split(':')[1]
        if(!travelID) throw PlaceError.unbindedPlace()

        const travel = await TravelService.read(ctx, travelID)
        if(!travel) throw TravelError.unexpectedTravelId(travelID)

        const action = new Action({
            action:ActionType.ADD,
            entity: StoreName.PLACE,
            data: place,
            user_id: ctx.user?.id
        })

        try {
            await DB.add(StoreName.PLACE, place)
        }catch (e){
            throw PlaceError.placeAlreadyExist(place)
        }

        // try {
        //     travel.places_id.push(place.id)
        //     await TravelService.update(ctx, travel)
        // } catch (e){
        //     if(e instanceof CustomError && e.code === ErrorCode.NETWORK_ERROR){}
        //     else throw e
        // }

        await ActionService.create(ctx, action)
        return place
    }

    static async read(ctx: Context, placeID:string){
        let place = await DB.getOne<Place>(StoreName.PLACE, placeID)
        if (place) return new Place(place)

        const id = placeID.split(':').pop()
        if(id !== undefined) {
            const response = await fetchPlaceByID(id)
            if(response.ok){
                place = new Place(response.data)
                place.id = placeID
                await DB.add(StoreName.PLACE, place)
                return new Place(place)
            }
        }
    }

    static async readLocal(ctx: Context, placeID:string){
        return DB.getOne<Place>(StoreName.PLACE, placeID)
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
        return places.map(p => new Place(p))
    }

    static async update(ctx: Context, place: Place){
        const ext = await DB.getOne<Place>(StoreName.PLACE, place.id) || new Place({})
        const dif = Compare.place(ext, place)
        const action = new Action({
            action:ActionType.UPDATE,
            entity: StoreName.PLACE,
            data: dif,
            user_id: ctx.user?.id
        })

        await ActionService.create(ctx, action)
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
            data: {id},
            user_id: ctx.user?.id
        })

        // try {
        //     travel.places_id = travel.places_id.filter(id => id !== place.id)
        //     await TravelService.update(ctx, travel)
        // } catch (e){
        //     if(e instanceof CustomError && e.code === ErrorCode.NETWORK_ERROR){}
        //     else throw e
        // }

        await DB.delete(StoreName.PLACE, id)
        await ActionService.create(ctx, action)
        return place
    }
}