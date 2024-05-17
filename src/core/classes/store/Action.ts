import {nanoid} from "nanoid";

import {PartialExpense, PartialHotel, PartialMessage, PartialPlace, PartialTravel, PartialUser} from "./partial";
import {ActionType} from "../../../types/ActionType";
import {StoreName} from "../../../types/StoreName";
import {DBFlagType} from "../../../types/DBFlagType";
import {ActionDto} from "../dto";


/**
 * представление совершенного действия
 *
 * Содержит информацию о:
 * -  времени, когда было совершено действие (__datetime__)
 * -  имени сущности, которую изменили (__entity__)
 * -  кем совершено изменение (__user_id__)
 *
 * synced - флаг, сигнализирует о том, что action доставлен
 *
 * содержит поля:
 *
 * __id__,
 * __action__,
 * __data__,
 * __datetime__,
 * __entity__,
 * __synced__,
 * __user_id__,
 */
export class Action<T extends Record<string, any>> {

    id:string;
    uid: string;
    action: ActionType;
    /** dto object */
    data: T;
    datetime: Date;
    entity: StoreName;
    synced: DBFlagType;
    user_id = '';

    constructor(action?: Partial<Action<T>> | ActionDto) {
        if(!action) action = {}

        this.id         = action.id !== undefined ? action.id : nanoid(16)
        this.uid        = action.uid !== undefined ? action.uid : this.id
        this.action     = action.action !== undefined ? action.action : ActionType.ADD

        this.datetime   = action.datetime !== undefined ? new Date(action.datetime) : new Date()
        this.entity     = action.entity !== undefined ? action.entity : StoreName.UNINITIALIZED
        this.synced     = action.synced !== undefined ? action.synced : 0
        this.user_id    = action.user_id !== undefined ? action.user_id : ''

        switch(this.entity){
            case StoreName.TRAVEL:
                this.data = new PartialTravel(action.data) as T
                break
            case StoreName.EXPENSES_ACTUAL:
            case StoreName.EXPENSES_PLAN:
                this.data = new PartialExpense(action.data) as T
                break
            case StoreName.HOTELS:
                this.data = new PartialHotel(action.data || {}) as T
                break
            case StoreName.PLACE:
                this.data = new PartialPlace(action.data || {}) as unknown as T
                break
            case StoreName.USERS:
                this.data = new PartialUser(action.data || {}) as T
                break
            case StoreName.MESSAGE:
                this.data = new PartialMessage(action.data || {}) as T
                break
            default:
                this.data = action.data !== undefined ? action.data as T: {} as T
        }
    }

    static getAction<T extends object>(data: T, user_id: string, entity: StoreName, actionType: ActionType){
        const action = new Action()
        if(data) action.data = data
        if(user_id) action.user_id = user_id
        if(entity) action.entity = entity
        if(actionType) action.action = actionType
        return action
    }
}

