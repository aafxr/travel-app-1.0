import {Hotel} from "../classes/store/Hotel";
import {ErrorCode} from "./ErrorCode";
import {CustomError} from "./CustomError";

export class HotelError extends CustomError{
    static hotelAlreadyExist(hotel: Hotel){
        return new HotelError(`Отель ${hotel.name} с id: ${hotel.id} уже существует`, ErrorCode.HOTEL_ALREADY_EXIST)
    }
}