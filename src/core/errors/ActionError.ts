import {CustomError} from "./CustomError";
import {ErrorCode} from "./ErrorCode";

export class ActionError extends CustomError{
    static actionAlreadyExist(){
        return new ActionError('Action already exist', ErrorCode.ACTION_ALREADY_EXIST)
    }

}