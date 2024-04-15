import {CustomError} from "./CustomError";
import {Place} from "../classes/store/Place";
import {ErrorCode} from "./ErrorCode";

export class PlaceError extends CustomError{
    static placeAlreadyExist(place: Place){
        return new PlaceError(`Место ${place.name} с id: ${place.id} уже существует`, ErrorCode.PLACE_ALREADY_EXIST)
    }
}