import {Action, Expense, Hotel, Limit, Photo, Place, Travel} from "./store";
import {ActionType} from "../../types/ActionType";
import {StoreName} from "../../types/StoreName";
import {assign} from "../../utils/assign";
import {ActionError} from "../errors";
import {Recover} from "./Recover";
import {DB} from "../db/DB";
import {ExpenseVariantType} from "../../types/ExpenseVariantType";

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
            travel = await Recover.travel(id)
            travel && await DB.update(StoreName.TRAVEL, travel)
            return travel
        }


        if(travel.updated_at.getTime() < action.datetime.getTime()){
            assign(travel, action.data)
            await DB.update(StoreName.TRAVEL, travel)
            return new Travel(travel)
        }

        travel = await Recover.travel(id)
        if(travel) {
            await DB.update(StoreName.TRAVEL, travel)
            return travel
        }
    }



    static async expense(action: Action<Partial<Expense>>){
        if (!action.entity.includes('expense')) ActionError.tryToUpdateEntityByWrongAction('expense', action)

        const id = action.data.id
        if(!id) return

        const e = await Recover.expense(id, action.entity as ExpenseVariantType)
        if(e){
            await DB.update(StoreName.EXPENSE, e)
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
        if(limit) await DB.update(StoreName.LIMIT, limit)
        return limit
    }


    static async place(action: Action<Partial<Place>>){
        if (action.entity !== StoreName.PLACE) ActionError.tryToUpdateEntityByWrongAction(StoreName.PLACE, action)

        const id = action.data.id
        if(!id) return
        let place = await Recover.place(id)
        if(place) await DB.update(StoreName.PLACE, place)
        return place
    }


    static async hotel(action: Action<Partial<Hotel>>){
        if (action.entity !== StoreName.HOTELS) ActionError.tryToUpdateEntityByWrongAction(StoreName.HOTELS, action)

        const id = action.data.id
        if(!id) return

        let hotel = await Recover.hotel(id)
        if(hotel) await DB.update(StoreName.HOTELS, hotel)
        return hotel
    }



    static async photo(action: Action<Photo>){
        if (action.entity !== StoreName.Photo) ActionError.tryToUpdateEntityByWrongAction(StoreName.Photo, action)

        const id = action.data.id
        if(!id) return

        const photo = await Recover.photo(id)
        if(photo) await DB.update(StoreName.Photo, photo)
        return photo
    }
}
