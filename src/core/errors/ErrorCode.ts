export enum ErrorCode{
    UNAUTHORIZED,
    NETWORK_ERROR,

    /** travel error */
    PERMISSION_DENIED_TO_CHANGE_TRAVEL = 100,
    UNEXPECTED_TRAVEL_ID,
    PERMISSION_DENIED_DELETE_TRAVEL,
    UNEXPECTED_PLACE,
    TRAVEL_UPDATE_BEFORE_CREATE,
    TRAVEL_DELETE_BEFORE_CREATE,
    TRAVEL_WITH_ID_ALREADY_EXIST,

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

    /** place */
    PLACE_ALREADY_EXIST = 700,
    UNBINDED_PLACE_WITH_TRAVEL,

    /** hotel*/
    HOTEL_ALREADY_EXIST = 800,
    UNBINDED_HOTEL_WITH_TRAVEL,

    /**action */
    ACTION_ALREADY_EXIST = 900,

}