import {Action, Expense, Hotel, Limit, Photo, Place, Travel} from "./store";
import {ExpenseVariantType} from "../../types/ExpenseVariantType";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {assign} from "../../utils/assign";
import {ActionError} from "../errors";
import {Recover} from "./Recover";
import {DB} from "../db/DB";


export enum UpdateStatusType{
    CREATED,
    UPDATED,
    DELETED,
    ERROR
}


export class UpdateResult<T extends {}>{
    result?: T
    status: UpdateStatusType
    error?: Error | string

    constructor(result?: T, status = UpdateStatusType.CREATED, error?: Error | string) {
        this.result = result
        this.status = status
        this.error = error
    }
}


/**
 * ### важно перед использование класса созранить action в бд
 * ---
 *
 * если класс возвращает обект -> запиь в бд обновлени и можно отправлять сущность в поток
 */
export class Update{
    /**
     * обновляет запись в бд о путешествии по имеющемся actions
     * - если были произведены обновления метод вернет обновленную сущность
     * @param action - новый эктион с измененными полями в travel
     */
    static async travel(action: Action<Partial<Travel>>): Promise<UpdateResult<Travel>>{
        if (action.entity !== StoreName.TRAVEL) ActionError.tryToUpdateEntityByWrongAction(StoreName.TRAVEL, action)

        if(action.action === ActionType.ADD){
            try {
                const travel = new Travel(action.data)
                await DB.add(StoreName.TRAVEL, travel)
                return new UpdateResult(travel)
            }catch(e){
                const result = new UpdateResult<Travel>(undefined, UpdateStatusType.ERROR)
                if(e instanceof Error || typeof e === 'string'){
                    result.error = e
                }
                return result
            }
        }

        const id = action.data.id
        if(!id) return new UpdateResult<Travel>(undefined, UpdateStatusType.ERROR, new Error('id is undefined'))

        let travel = await DB.getOne<Travel>(StoreName.TRAVEL, id)
        if(!travel) {
            const t = await Recover.travel(id)
            const result = new UpdateResult<Travel>()
            if(t instanceof Travel) {
                await DB.update(StoreName.TRAVEL, t)
                result.result = t
                result.status = UpdateStatusType.UPDATED
            } else{
                if(t === UpdateStatusType.DELETED){
                    await DB.delete(StoreName.TRAVEL, id)
                    result.status = UpdateStatusType.DELETED
                }else{
                    console.error(t)
                    result.status = UpdateStatusType.ERROR
                    result.error = new Error('Error while update travel')
                }
            }
            return result
        }


        if(travel.updated_at.getTime() < action.datetime.getTime()){
            assign(travel, action.data)
            await DB.update(StoreName.TRAVEL, travel)
            return new UpdateResult(new Travel(travel), UpdateStatusType.UPDATED)
        }

        const t = await Recover.travel(id)
        if(t instanceof Travel) {
            await DB.update(StoreName.TRAVEL, t)
            return new UpdateResult(t, UpdateStatusType.UPDATED)
        }else{
            if(t === UpdateStatusType.DELETED){
                await DB.delete(StoreName.TRAVEL, id)
                return new UpdateResult<Travel>(undefined, UpdateStatusType.DELETED)
            }else{
                console.error(t)
                return new UpdateResult<Travel>(undefined, UpdateStatusType.ERROR, new Error('Error while update travel'))
            }
        }
    }



    static async expense(action: Action<Partial<Expense>>){
        if (!action.entity.includes('expense')) ActionError.tryToUpdateEntityByWrongAction('expense', action)

        const result = new UpdateResult<Expense>()

        const id = action.data.id
        if(!id) return new UpdateResult<Expense>(undefined, UpdateStatusType.ERROR, new Error('id is undefined'))

        const e = await Recover.expense(id, action.entity as ExpenseVariantType)
        if(e instanceof Expense){
            await DB.update(StoreName.EXPENSE, e)
            result.result = e
            result.status = UpdateStatusType.UPDATED
        } else{
            if(e === UpdateStatusType.DELETED){
                await DB.delete(StoreName.EXPENSE, id)
                result.status = UpdateStatusType.DELETED
            }else{
                console.error(e)
                result.status = UpdateStatusType.ERROR
                result.error = new Error('Error while update Expense')
            }
        }
        return result
    }




    static async limit(action: Action<Partial<Limit>>){
        if (action.entity !== StoreName.LIMIT) ActionError.tryToUpdateEntityByWrongAction(StoreName.LIMIT, action)

        const result = new UpdateResult<Limit>()

        const id = action.data.id
        if(!id) return new UpdateResult<Limit>(undefined, UpdateStatusType.ERROR,  new Error('id is undefined'))

        let limit = await Recover.limit(id)
        if(limit instanceof Limit) {
            await DB.update(StoreName.LIMIT, limit)
            result.result = limit
            result.status = UpdateStatusType.UPDATED
        } else {
            if(limit === UpdateStatusType.DELETED){
                await DB.delete(StoreName.LIMIT, id)
                result.status = UpdateStatusType.ERROR
            }else{
                console.error(limit)
                result.status = UpdateStatusType.ERROR
                result.error = new Error('Error while update Limit')
            }
        }
        return result
    }


    static async place(action: Action<Partial<Place>>){
        if (action.entity !== StoreName.PLACE) ActionError.tryToUpdateEntityByWrongAction(StoreName.PLACE, action)

        const result = new UpdateResult<Place>()

        const id = action.data.id
        if(!id) return new UpdateResult<Place>(undefined, UpdateStatusType.ERROR, new Error('id is undefined'))
        let p = await Recover.place(id)
        if(p instanceof Place) {
            await DB.update(StoreName.PLACE, p)
            result.result = p
            result.status = UpdateStatusType.UPDATED
        } else{
            if(p === UpdateStatusType.DELETED){
                await DB.delete(StoreName.PLACE, id)
                result.status = UpdateStatusType.DELETED
            }else{
                console.error(p)
                result.status = UpdateStatusType.ERROR
                result.error = new Error('Error occurred while update place')
            }
        }
        return result
    }


    static async hotel(action: Action<Partial<Hotel>>){
        if (action.entity !== StoreName.HOTELS) ActionError.tryToUpdateEntityByWrongAction(StoreName.HOTELS, action)

        const result = new UpdateResult<Hotel>()

        const id = action.data.id
        if(!id) return new UpdateResult<Hotel>(undefined, UpdateStatusType.ERROR, new Error('id is undefined'))

        let h = await Recover.hotel(id)
        if(h instanceof Hotel) {
            await DB.update(StoreName.HOTELS, h)
            result.result = h
            result.status = UpdateStatusType.UPDATED
        }else{
            if(h === UpdateStatusType.DELETED){
                await DB.delete(StoreName.PLACE, id)
                result.status = UpdateStatusType.DELETED
            }else{
                console.error(h)
                result.status = UpdateStatusType.ERROR
                result.error = new Error('Error occurred while update hotel')
            }
        }
        return result
    }



    static async photo(action: Action<Photo>){
        if (action.entity !== StoreName.Photo) ActionError.tryToUpdateEntityByWrongAction(StoreName.Photo, action)

        const result = new UpdateResult<Photo>()

        const id = action.data.id
        if(!id) return new UpdateResult<Photo>(undefined, UpdateStatusType.ERROR, new Error('id is undefined'))

        const p = await Recover.photo(id)
        if(p instanceof Photo) {
            await DB.update(StoreName.Photo, p)
            result.result = p
            result.status = UpdateStatusType.UPDATED
        }else{
            if(p === UpdateStatusType.DELETED){
                await DB.delete(StoreName.PLACE, id)
                result.status = UpdateStatusType.DELETED
            }else{
                console.error(p)
                result.status = UpdateStatusType.ERROR
                result.error = new Error('Error occurred while update photo')
            }
        }
        return result
    }
}
