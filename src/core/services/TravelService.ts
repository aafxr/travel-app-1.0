import {Action, Compare, Context, Travel} from "../classes";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {ActionService} from "./ActionService";
import {TravelError} from "../errors";
import {DB} from "../db/DB";
import {sendNewTravel} from "../../api/fetch/sendNewTravel";

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
        try {
            const response = await sendNewTravel(travel)
        }catch (e){console.error(e)}
        // const response = await sendNewTravel(travel)
        // if (!response.ok) {
        //     await DB.delete(StoreName.TRAVEL, travel.id)
        //     return
        // }

        await ActionService.create(ctx, action)
        return travel
    }


    static async read(ctx: Context, travelID:string){
        let travel = await DB.getOne<Travel>(StoreName.TRAVEL, travelID)
        if(travel) return travel

        // const result = await fetchTravels()
        //
        // if(result.length){
        //     let _t: Travel | undefined
        //     for (const t of result){
        //         try {
        //             await DB.add(StoreName.TRAVEL, t)
        //             if(travelID === t.id) _t = t
        //         } catch (r){}
        //     }
        //     return _t
        // }
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
        // let travels = await fetchTravels()
        // if(travels.length) {
        //     for (const t of travels){
        //         await DB.update(StoreName.TRAVEL, t)
        //     }
        // } else travels = await DB.getAll<Travel>(StoreName.TRAVEL)

        let travels = await DB.getAll<Travel>(StoreName.TRAVEL)

        return travels.map(t => new Travel(t))
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
