import {Action} from "../store";
import {StoreName} from "../../../types/StoreName";
import {ActionType} from "../../../types/ActionType";
import {DBFlagType} from "../../../types/DBFlagType";
import {TravelDTO} from "./Travel.dto";
import {LimitDTO} from "./Limit.dto";
import {ExpenseDTO} from "./Expense.dto";
import {PlaceDto} from "./Place.dto";
import {HotelDto} from "./Hotel.dto";

export class ActionDto implements Omit<Action<any>, 'datetime'>{
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

        switch (action.entity){
            case StoreName.TRAVEL:
                this.data = new TravelDTO(action.data)
                break
            case StoreName.LIMIT:
                this.data = new LimitDTO(action.data)
                break
            case 'expenses_actual':
            case 'expenses_plan':
                this.data = new ExpenseDTO(action.data)
                break
            case StoreName.PLACE:
                this.data = new PlaceDto(action.data)
                break
            case StoreName.HOTELS:
                this.data = new HotelDto(action.data)
                break
            default:
                this.data = action.data
        }
    }

}