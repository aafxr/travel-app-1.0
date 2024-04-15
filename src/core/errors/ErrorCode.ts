export enum ErrorCode{
    UNAUTHORIZED,
    NETWORK_ERROR,

    /** travel error */
    PERMISSION_DENIED_TO_CHANGE_TRAVEL = 100,
    UNEXPECTED_TRAVEL_ID,
    PERMISSION_DENIED_DELETE_TRAVEL,
    UNEXPECTED_PLACE,
    TRAVEL_UPDATE_BEFORE_CREATE,

    /** expense error */
    EXPENSE_PERMISSION_DENIED=200,
    UPDATE_EXPENSE_NOT_EXIST,
    DELETE_EXPENSE_NOT_EXIST,


    /** limit error */
    PERMISSION_DENIED_CHANGE_LIMIT=300,
    LOW_LIMIT_VALUE,
    LIMIT_UPDATE_BEFORE_CREATE,
    UPDATING_LIMIT_NOT_EXIST,
    DELETE_LIMIT_NOT_EXIST,


    USER_UPDATE_BEFORE_CREATE = 400,

    Unexpected_Action_Entity_Type = 500,

    PHOTO_LOADING_ERROR = 600,
    PHOTO_ALREADY_EXIST ,

    PLACE_ALREADY_EXIST = 700,

    HOTEL_ALREADY_EXIST = 800,

}