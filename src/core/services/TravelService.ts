import {Action, Compare, Context, Recover, Travel} from "../classes";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {ActionService} from "./ActionService";
import {TravelError} from "../errors";
import {DB} from "../db/DB";
import {sendNewTravel} from "../../api/fetch/sendNewTravel";
import {fetchTravels} from "../../api/fetch";
import {ActionController} from "../service-controllers";

export class TravelService {
    static async create(ctx: Context, travel: Travel) {
        travel.created_at = new Date()
        const action = new Action({
            action: ActionType.ADD,
            entity: StoreName.TRAVEL,
            data: travel,
            user_id: ctx.user?.id
        })

        try {
            await DB.add(StoreName.TRAVEL, travel)
        } catch (e) {
            console.error(e)
            throw TravelError.travelWithIDAlreadyExist(travel)
        }
        try {
            const response = await sendNewTravel(travel)
            if (!response.ok) {
                throw TravelError.createTravelFail(travel, response.message)
            }
        } catch (e) {
            if(e instanceof TravelError) throw e
            console.error(e)
        }


        await ActionService.create(ctx, action)
        return travel
    }


    static async read(ctx: Context, travelID: string) {
        let travel = await DB.getOne<Travel>(StoreName.TRAVEL, travelID)
        if(travel) return travel

        const result = await TravelService.getList(ctx)

        if (result.length) {
            let _t: Travel | undefined
            for (const t of result) {
                try {
                    await DB.add(StoreName.TRAVEL, t)
                    if (travelID === t.id) _t = t
                } catch (r) {
                }
            }
            return _t
        }
    }

    static async readAll(ctx: Context, ...travelIDs: string[]) {
        const result: Travel[] = []
        for (const id of travelIDs) {
            const travel = await TravelService.read(ctx, id)
            if (travel) result.push(travel)
        }
        return result
    }

    static async getList(ctx: Context) {
        let travels = await fetchTravels()
        if(travels.length) {
            for (let i = 0; i < travels.length; i++){
                const t = travels[i]
                const ex = await DB.getOne<Travel>(StoreName.TRAVEL, t.id)
                if(!ex) {
                    console.log(`Found new travel: ${t}`)
                    await DB.add<Travel>(StoreName.TRAVEL, t)
                    await ActionController.loadActionsFromTimestamp(ctx, t.created_at.getTime()).catch(console.error)
                    const recoverTravel = await Recover.travel(t.id)
                    console.log('recovered travel')
                    console.log(recoverTravel)
                    if(recoverTravel) {
                        await DB.update<Travel>(StoreName.TRAVEL, recoverTravel)
                        travels[i] = recoverTravel
                    }
                }
                else travels[i] = ex
            }
        } else travels = await DB.getAll<Travel>(StoreName.TRAVEL)

        // let travels = await DB.getAll<Travel>(StoreName.TRAVEL)

        return travels.map(t => new Travel(t))
    }

    static async update(ctx: Context, travel: Travel) {
        travel.updated_at = new Date()
        const ext = await DB.getOne<Travel>(StoreName.TRAVEL, travel.id)
        if (!ext) throw TravelError.updateBeforeCreate()

        const dif = Compare.travel(ext, travel)

        const action = new Action({
            action: ActionType.UPDATE,
            entity: StoreName.TRAVEL,
            data: dif,
            user_id: ctx.user?.id
        })

        await DB.update(StoreName.TRAVEL, travel)
        await ActionService.create(ctx, action)
        return travel
    }

    static async delete(ctx: Context, travel: Travel) {
        const ext = await DB.getOne<Travel>(StoreName.TRAVEL, travel.id)
        if (!ext) throw TravelError.deleteBeforeCreate()

        const action = new Action({
            action: ActionType.UPDATE,
            entity: StoreName.TRAVEL,
            data: {id: travel.id},
            user_id: ctx.user?.id
        })

        await DB.delete(StoreName.TRAVEL, travel.id)
        await ActionService.create(ctx, action)
        return travel
    }
}
