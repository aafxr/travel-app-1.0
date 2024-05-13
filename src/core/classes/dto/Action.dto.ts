import {Action} from "../store";
import {StoreName} from "../../../types/StoreName";
import {ActionType} from "../../../types/ActionType";
import {DBFlagType} from "../../../types/DBFlagType";
import {TravelDTO} from "./Travel.dto";
import {LimitDTO} from "./Limit.dto";
import {ExpenseDTO} from "./Expense.dto";
import {PlaceDto} from "./Place.dto";
import {HotelDto} from "./Hotel.dto";
import {filter} from "rxjs";

export class ActionDto implements Omit<Action<any>, 'datetime'> {
    id: string;
    uid: string;
    user_id: string;
    data: Record<string, any>;
    action: ActionType;
    entity: StoreName;
    synced: DBFlagType;
    datetime: number;

    constructor(action: Action<any>) {
        this.id = action.id
        this.uid = action.uid
        this.user_id = action.user_id
        this.action = action.action
        this.entity = action.entity
        this.synced = action.synced
        this.datetime = action.datetime.getTime()
        this.data = {}

        switch (action.entity) {
            case StoreName.TRAVEL:
                Object.entries(new TravelDTO(action.data))
                    .forEach(([key, val]) => val !== undefined && (this.data[key] = val))
                break
            case StoreName.LIMIT:
                Object.entries(new LimitDTO(action.data))
                    .forEach(([key, val]) => val !== undefined && (this.data[key] = val))
                break
            case 'expenses_actual':
            case 'expenses_plan':
                Object.entries(new ExpenseDTO(action.data))
                    .forEach(([key, val]) => val !== undefined && (this.data[key] = val))
                break
            case StoreName.PLACE:
                Object.entries(new PlaceDto(action.data))
                    .forEach(([key, val]) => val !== undefined && (this.data[key] = val))
                break
            case StoreName.HOTELS:
                Object.entries(new HotelDto(action.data))
                    .forEach(([key, val]) => val !== undefined && (this.data[key] = val))
                break
            default:
                this.data = action.data
        }
    }

}