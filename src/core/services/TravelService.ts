import {fetchTravelByID} from "../../api/fetch/fetchTravelByID";
import {Action, Compare, Context, Travel} from "../classes";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {ActionService} from "./ActionService";
import {fetchTravels} from "../../api/fetch";
import {TravelError} from "../errors";
import {DB} from "../db/DB";

export class TravelService{
    static async create(ctx: Context, travel: Travel){
        travel.created_at = new Date()
        const action = new Action({
            action: ActionType.ADD,
            entity: StoreName.TRAVEL,
            data: travel
        })

        try {
            await DB.add(StoreName.TRAVEL, travel)
        } catch (e) {
            console.error(e)
            throw TravelError.travelWithIDAlreadyExist(travel)
        }

        await ActionService.create(ctx, action)
        return travel
    }


    static async read(ctx: Context, travelID:string){
        let travel = await DB.getOne<Travel>(StoreName.TRAVEL, travelID)
        if(travel) return travel

        const result = await fetchTravelByID(travelID)
        if(result.ok){
            travel = new Travel(result.data)
            await DB.add(StoreName.TRAVEL, travelID)
            return travel
        }
    }

    static async readAll(ctx: Context, ...travelIDs:string[]){
        const result:Travel[] = []
        for(const id of travelIDs){
            const travel = await TravelService.read(ctx, id)
            if(travel) result.push(travel)
        }
        return result
    }

    static async getList(ctx: Context){
        const result = await fetchTravels()
        const travels = result.map(t => new Travel(t))
        for (const t of travels){
            await DB.update(StoreName.TRAVEL, t)
        }
        return travels
    }

    static async update(ctx: Context, travel: Travel){
        travel.updated_at = new Date()
        const ext = await DB.getOne<Travel>(StoreName.TRAVEL, travel.id)
        if(!ext) throw TravelError.updateBeforeCreate()

        const dif = Compare.travel(ext, travel)
        const action = new Action({
            action: ActionType.UPDATE,
            entity: StoreName.TRAVEL,
            data: dif
        })

        await DB.update(StoreName.TRAVEL, travel)
        await ActionService.create(ctx, action)
        return travel
    }

    static async delete(ctx: Context, travel: Travel){
        const ext = await DB.getOne<Travel>(StoreName.TRAVEL, travel.id)
        if(!ext) throw TravelError.deleteBeforeCreate()

        const action = new Action({
            action: ActionType.UPDATE,
            entity: StoreName.TRAVEL,
            data: {id: travel.id}
        })

        await DB.delete(StoreName.TRAVEL, travel.id)
        await ActionService.create(ctx, action)
        return travel
    }
}
