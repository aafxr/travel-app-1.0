import {CustomError} from "./CustomError";
import {ErrorCode} from "./ErrorCode";

export class PhotoError extends CustomError{
    static photoLoadingFail(msg?:string){
        let message = 'Photo loading faile.'
        if(msg) message += '\nExtra info:' + msg
        return new PhotoError(message, ErrorCode.PHOTO_LOADING_ERROR)
    }
}