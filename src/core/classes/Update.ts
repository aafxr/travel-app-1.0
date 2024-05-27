import {Action, Expense, Hotel, Limit, Photo, Place, Travel} from "./store";
import {ExpenseVariantType} from "../../types/ExpenseVariantType";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {assign} from "../../utils/assign";
import {ActionError} from "../errors";
import {Recover} from "./Recover";
import {DB} from "../db/DB";


export enum UpdateStatusType{
    DELETED,

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
    static async travel(action: Action<Partial<Travel>>){
        if (action.entity !== StoreName.TRAVEL) ActionError.tryToUpdateEntityByWrongAction(StoreName.TRAVEL, action)

        if(action.action === ActionType.ADD){
            try {
                const travel = new Travel(action.data)
                await DB.add(StoreName.TRAVEL, travel)
                return travel
            }catch(e){
                return
            }
        }

        const id = action.data.id
        if(!id) return

        let travel = await DB.getOne<Travel>(StoreName.TRAVEL, id)
        if(!travel) {
            const t = await Recover.travel(id)
            if(t instanceof Travel) {
                await DB.update(StoreName.TRAVEL, t)
            } else{
                if(t === UpdateStatusType.DELETED){
                    await DB.delete(StoreName.TRAVEL, id)
                }else{
                    console.error(t)
                }
            }
            return t
        }


        if(travel.updated_at.getTime() < action.datetime.getTime()){
            assign(travel, action.data)
            await DB.update(StoreName.TRAVEL, travel)
            return new Travel(travel)
        }

        const t = await Recover.travel(id)
        if(t instanceof Travel) {
            await DB.update(StoreName.TRAVEL, t)
            return t
        }else{
            if(t === UpdateStatusType.DELETED){
                await DB.delete(StoreName.TRAVEL, id)
            }else{
                console.error(t)
            }
        }
    }



    static async expense(action: Action<Partial<Expense>>){
        if (!action.entity.includes('expense')) ActionError.tryToUpdateEntityByWrongAction('expense', action)

        const id = action.data.id
        if(!id) return

        const e = await Recover.expense(id, action.entity as ExpenseVariantType)
        if(e instanceof Expense){
            await DB.update(StoreName.EXPENSE, e)
        } else{
            if(e === UpdateStatusType.DELETED){
                await DB.delete(StoreName.EXPENSE, id)
            }else{
                console.error(e)
            }
        }
        return e

        // const extExpense =  await DB.getOne<Expense>(StoreName.EXPENSE, id)


        // if(action.action === ActionType.ADD){
        //     const expense = new Expense(action.data)
        //     if(expense) {
        //         await DB.update(StoreName.EXPENSE, expense)
        //         return expense
        //     }
        // }else if(action.action === ActionType.DELETE){
        //     const expense = await DB.getOne<Expense>(StoreName.EXPENSE, id)
        //     if(!expense) return
        //     await DB.delete(StoreName.EXPENSE, id)
        //     expense.deleted = true
        //     return expense
        // }else{
        //
        // }
    }




    static async limit(action: Action<Partial<Limit>>){
        if (action.entity !== StoreName.LIMIT) ActionError.tryToUpdateEntityByWrongAction(StoreName.LIMIT, action)

        const id = action.data.id
        if(!id) return

        let limit = await Recover.limit(id)
        if(limit instanceof Limit) {
            await DB.update(StoreName.LIMIT, limit)
        } else {
            if(limit === UpdateStatusType.DELETED){
                await DB.delete(StoreName.LIMIT, id)
            }else{
                console.error(limit)
            }
        }
        return limit
    }


    static async place(action: Action<Partial<Place>>){
        if (action.entity !== StoreName.PLACE) ActionError.tryToUpdateEntityByWrongAction(StoreName.PLACE, action)

        const id = action.data.id
        if(!id) return
        let p = await Recover.place(id)
        if(p) {
            await DB.update(StoreName.PLACE, p)
        } else{
            if(p === UpdateStatusType.DELETED){
                await DB.delete(StoreName.PLACE, id)
            }else{
                console.error(p)
            }
        }
        return p
    }


    static async hotel(action: Action<Partial<Hotel>>){
        if (action.entity !== StoreName.HOTELS) ActionError.tryToUpdateEntityByWrongAction(StoreName.HOTELS, action)

        const id = action.data.id
        if(!id) return

        let h = await Recover.hotel(id)
        if(h) {
            await DB.update(StoreName.HOTELS, h)
        }else{
            if(h === UpdateStatusType.DELETED){
                await DB.delete(StoreName.PLACE, id)
            }else{
                console.error(h)
            }
        }
        return h
    }



    static async photo(action: Action<Photo>){
        if (action.entity !== StoreName.Photo) ActionError.tryToUpdateEntityByWrongAction(StoreName.Photo, action)

        const id = action.data.id
        if(!id) return

        const p = await Recover.photo(id)
        if(p) {
            await DB.update(StoreName.Photo, p)
        }else{
            if(p === UpdateStatusType.DELETED){
                await DB.delete(StoreName.PLACE, id)
            }else{
                console.error(p)
            }
        }
        return p
    }
}
