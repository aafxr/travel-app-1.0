import {CustomError} from "./CustomError";
import {Message} from "../classes";
import {ErrorCode} from "./ErrorCode";

export class MessageError extends CustomError{

    static messageAlreadyExist(message: Message){
        return new MessageError(`Message ${message.id} is already exist`, ErrorCode.MESSAGE_ALREADY_EXIST)
    }

    static updateBeforeCreate(message: Message){
        return new MessageError(`Try to update message that not exist yet. ID: ${message.id}`, ErrorCode.MESSAGE_UPDATE_BEFORE_CREATE)
    }

    static deleteBeforeCreate(message: Message){
        return new MessageError(`Try to update message that not exist yet. ID: ${message.id}`, ErrorCode.MESSAGE_DELETE_BEFORE_CREATE)
    }
}