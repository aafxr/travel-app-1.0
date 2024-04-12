import {CustomError} from "./CustomError";
import {ErrorCode} from "./ErrorCode";

/**
 * класс с набором статических методов для создания инстансов ошибки с кратким описанием и кодом ошибки
 */
export class ExpenseError extends CustomError {


    static permissionDenied() {
        return new ExpenseError(`Отказ в доступе на изменение расхода`, ErrorCode.EXPENSE_PERMISSION_DENIED)
    }

    static updateExpenseNotExist() {
        return new ExpenseError(`Обновление до создания расхода`, ErrorCode.UPDATE_EXPENSE_NOT_EXIST)
    }

    static deleteExpenseNotExist() {
        return new ExpenseError(`Удаление до создания расхода`, ErrorCode.DELETE_EXPENSE_NOT_EXIST)
    }
}