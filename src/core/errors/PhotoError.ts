import {CustomError} from "./CustomError";
import {ErrorCode} from "./ErrorCode";
import {Photo} from "../classes";

export class PhotoError extends CustomError{
    static photoLoadingFail(msg?:string){
        let message = 'Photo loading faile.'
        if(msg) message += '\nExtra info:' + msg
        return new PhotoError(message, ErrorCode.PHOTO_LOADING_ERROR)
    }

    static photoAlreadyExist(photo: Photo){
        return new PhotoError('Фото с таким id уже существует', ErrorCode.PHOTO_ALREADY_EXIST)
    }
}