import {Action} from "../store";
import {StoreName} from "../../../types/StoreName";
import {ActionType} from "../../../types/ActionType";
import {DBFlagType} from "../../../types/DBFlagType";

export class ActionDto implements Omit<Action<any>, 'datetime'>{
    id: string;
    uid: string;
    user_id: string;
    data: {};
    action: ActionType;
    entity: StoreName;
    synced: DBFlagType;
    datetime: number;

    constructor(action: Action<any>) {
        this.id = action.id
        this.uid = action.uid
        this.user_id = action.user_id
        this.data = action.data
        this.action = action.action
        this.entity = action.entity
        this.synced = action.synced
        this.datetime = action.datetime.getTime()
    }

}