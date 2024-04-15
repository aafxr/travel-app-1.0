import {CustomError} from "./CustomError";
import {ErrorCode} from "./ErrorCode";
import {Action} from "../classes";


export class SocketError extends CustomError{

    static UnexpectedActionEntityType(action:Action<any>){
        return new SocketError('Unexpected action entity type\n' + JSON.stringify(action), ErrorCode.Unexpected_Action_Entity_Type)
    }

}