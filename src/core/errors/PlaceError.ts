import {CustomError} from "./CustomError";
import {Place} from "../classes";
import {ErrorCode} from "./ErrorCode";

export class PlaceError extends CustomError{
    static placeAlreadyExist(place: Place){
        return new PlaceError(`Место ${place.name} с id: ${place.id} уже существует`, ErrorCode.PLACE_ALREADY_EXIST)
    }

    static unbindedPlace(){
        return new PlaceError('placeID не содержит id путешествия, к которому добавляется', ErrorCode.UNBINDED_PLACE_WITH_TRAVEL)
    }
}