import {CustomError} from "./CustomError";
import {ErrorCode} from "./ErrorCode";
import {Action} from "../classes";
import {StoreName} from "../../types/StoreName";

export class ActionError extends CustomError{
    static actionAlreadyExist(){
        return new ActionError('Action already exist', ErrorCode.ACTION_ALREADY_EXIST)
    }

    static tryToUpdateEntityByWrongAction(entityName: string | StoreName, action: Action<any>){
        return new ActionError(`try to update entity: ${entityName} by wrang action. \n${action}`, ErrorCode.TRY_TO_UPDATE_ACTION_BY_WRANG_ACTION)
    }

}