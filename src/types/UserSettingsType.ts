import {DBFlagType} from "./DBFlagType";
import {ExpenseFilterType} from "./ExpenseFilterType";
import {RouteFilterType} from "./RouteFilterType";

export type UserSettingsType = {
    curtain: DBFlagType,
    expensesFilter: ExpenseFilterType,
    routeFilter: RouteFilterType,
    day: number
}