import {DBFlagType} from "./DBFlagType";
import {ExpenseFilterType} from "./ExpenseFilterType";
import {RouteFilterType} from "./RouteFilterType";
import {CurrencyType} from "./CurrencyType";
import {LangKeyType} from "../contexts/LangContextProvider/LangType";

export type UserSettingsType = {
    curtain: DBFlagType,
    expensesFilter: ExpenseFilterType,
    routeFilter: RouteFilterType,
    day: number
    currency: CurrencyType['char_code'],
    lang: LangKeyType
}