import {CustomError} from "./CustomError";
import {ErrorCode} from "./ErrorCode";
import {Travel} from "../classes";


/**
 * класс с набором статических методов для создания инстансов ошибки с кратким описанием и кодом ошибки
 */
export class TravelError extends CustomError {
    static permissionDeniedToChangeTravel() {
        return new TravelError('У вас нет прав на изменение', ErrorCode.PERMISSION_DENIED_TO_CHANGE_TRAVEL)
    }

    static permissionDeniedDeleteTravel() {
        return new TravelError('Вы не можете удалить данное путешествие', ErrorCode.PERMISSION_DENIED_DELETE_TRAVEL)
    }

    static unexpectedTravelId(travelId: string){
        return new TravelError(`Путешествие с id="${travelId}" не найдино`, ErrorCode.UNEXPECTED_TRAVEL_ID)
    }

    static unexpectedPlace(placeId: string){
        return new TravelError(`Unexpected place with id="${placeId}"`, ErrorCode.UNEXPECTED_TRAVEL_ID)
    }

    static updateBeforeCreate(){
        return new TravelError(`Обновление путешествия до созлания`, ErrorCode.TRAVEL_UPDATE_BEFORE_CREATE)
    }

    static deleteBeforeCreate(){
        return new TravelError(`Удаление путешествия до созлания`, ErrorCode.TRAVEL_DELETE_BEFORE_CREATE)
    }

    static travelWithIDAlreadyExist(travel: Travel){
        return new TravelError(`Путешествие с id=${travel.id} уже существует`, ErrorCode.TRAVEL_WITH_ID_ALREADY_EXIST)
    }

    static createTravelFail(travel: Travel, reason: string){
        return new TravelError(`Не возможно создать путешествие с id=${travel.id}. \nПричина: ${reason}`, ErrorCode.TRAVEL_CREATE_FAIL)
    }
}