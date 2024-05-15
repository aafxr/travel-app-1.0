"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 0] = "UNAUTHORIZED";
    ErrorCode[ErrorCode["NETWORK_ERROR"] = 1] = "NETWORK_ERROR";
    /** travel error */
    ErrorCode[ErrorCode["PERMISSION_DENIED_TO_CHANGE_TRAVEL"] = 100] = "PERMISSION_DENIED_TO_CHANGE_TRAVEL";
    ErrorCode[ErrorCode["UNEXPECTED_TRAVEL_ID"] = 101] = "UNEXPECTED_TRAVEL_ID";
    ErrorCode[ErrorCode["PERMISSION_DENIED_DELETE_TRAVEL"] = 102] = "PERMISSION_DENIED_DELETE_TRAVEL";
    ErrorCode[ErrorCode["UNEXPECTED_PLACE"] = 103] = "UNEXPECTED_PLACE";
    ErrorCode[ErrorCode["TRAVEL_UPDATE_BEFORE_CREATE"] = 104] = "TRAVEL_UPDATE_BEFORE_CREATE";
    ErrorCode[ErrorCode["TRAVEL_DELETE_BEFORE_CREATE"] = 105] = "TRAVEL_DELETE_BEFORE_CREATE";
    ErrorCode[ErrorCode["TRAVEL_WITH_ID_ALREADY_EXIST"] = 106] = "TRAVEL_WITH_ID_ALREADY_EXIST";
    ErrorCode[ErrorCode["TRAVEL_CREATE_FAIL"] = 107] = "TRAVEL_CREATE_FAIL";
    /** expense error */
    ErrorCode[ErrorCode["EXPENSE_PERMISSION_DENIED"] = 200] = "EXPENSE_PERMISSION_DENIED";
    ErrorCode[ErrorCode["UPDATE_EXPENSE_NOT_EXIST"] = 201] = "UPDATE_EXPENSE_NOT_EXIST";
    ErrorCode[ErrorCode["DELETE_EXPENSE_NOT_EXIST"] = 202] = "DELETE_EXPENSE_NOT_EXIST";
    /** limit error */
    ErrorCode[ErrorCode["PERMISSION_DENIED_CHANGE_LIMIT"] = 300] = "PERMISSION_DENIED_CHANGE_LIMIT";
    ErrorCode[ErrorCode["LOW_LIMIT_VALUE"] = 301] = "LOW_LIMIT_VALUE";
    ErrorCode[ErrorCode["LIMIT_UPDATE_BEFORE_CREATE"] = 302] = "LIMIT_UPDATE_BEFORE_CREATE";
    ErrorCode[ErrorCode["UPDATING_LIMIT_NOT_EXIST"] = 303] = "UPDATING_LIMIT_NOT_EXIST";
    ErrorCode[ErrorCode["DELETE_LIMIT_NOT_EXIST"] = 304] = "DELETE_LIMIT_NOT_EXIST";
    ErrorCode[ErrorCode["USER_UPDATE_BEFORE_CREATE"] = 400] = "USER_UPDATE_BEFORE_CREATE";
    ErrorCode[ErrorCode["Unexpected_Action_Entity_Type"] = 500] = "Unexpected_Action_Entity_Type";
    ErrorCode[ErrorCode["PHOTO_LOADING_ERROR"] = 600] = "PHOTO_LOADING_ERROR";
    ErrorCode[ErrorCode["PHOTO_ALREADY_EXIST"] = 601] = "PHOTO_ALREADY_EXIST";
    /** place */
    ErrorCode[ErrorCode["PLACE_ALREADY_EXIST"] = 700] = "PLACE_ALREADY_EXIST";
    ErrorCode[ErrorCode["UNBINDED_PLACE_WITH_TRAVEL"] = 701] = "UNBINDED_PLACE_WITH_TRAVEL";
    /** hotel*/
    ErrorCode[ErrorCode["HOTEL_ALREADY_EXIST"] = 800] = "HOTEL_ALREADY_EXIST";
    ErrorCode[ErrorCode["UNBINDED_HOTEL_WITH_TRAVEL"] = 801] = "UNBINDED_HOTEL_WITH_TRAVEL";
    /**action */
    ErrorCode[ErrorCode["ACTION_ALREADY_EXIST"] = 900] = "ACTION_ALREADY_EXIST";
    ErrorCode[ErrorCode["TRY_TO_UPDATE_ACTION_BY_WRANG_ACTION"] = 901] = "TRY_TO_UPDATE_ACTION_BY_WRANG_ACTION";
    /** section */
    ErrorCode[ErrorCode["SECTION_ALREADY_EXIST"] = 1000] = "SECTION_ALREADY_EXIST";
    /** message */
    ErrorCode[ErrorCode["MESSAGE_ALREADY_EXIST"] = 1100] = "MESSAGE_ALREADY_EXIST";
    ErrorCode[ErrorCode["MESSAGE_UPDATE_BEFORE_CREATE"] = 1101] = "MESSAGE_UPDATE_BEFORE_CREATE";
    ErrorCode[ErrorCode["MESSAGE_DELETE_BEFORE_CREATE"] = 1102] = "MESSAGE_DELETE_BEFORE_CREATE";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
