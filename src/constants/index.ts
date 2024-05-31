import {RouteFilterType} from "../types/RouteFilterType";
import {CurrencyType} from "../types/CurrencyType";
import {LangKeyType, LangType, LangValueType} from "../contexts/LangContextProvider/LangType";

export const ACCESS_TOKEN = 'access_token'
export const REFRESH_TOKEN = 'refresh_token'

export const USER_AUTH = 'user'
export const THEME = 'theme'
export const DAY = 'day'
export const LANG = 'lang'

export const CACHE_VERSION = 39
export const GLOBAL_DB_VERSION = 39

export const DEFAULT_IMG_URL = process.env.PUBLIC_URL + '/images/travel-placeholder.jpg'

export const MS_IN_DAY = 24 * 60 * 60 * 1000

export const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

export const DEFAULT_SECTION = 'misc'

export const DEFAULT_CURRENCY: CurrencyType['char_code'] = "RUB"
export const CURRENCY_SYMBOL_LIST: CurrencyType['symbol'][] = ["$", "¥", "€", "₸", "₽"] as CurrencyType['symbol'][]
export const CURRENCY_CODE_LIST: CurrencyType['char_code'][] = ["USD","CNY","EUR","KZT","RUB"]
export const EXPENSE_FILTER_tYPE = 'expense_filter_type'


export const DEFAULT_LANGUGE: keyof LangType = 'rus'
export const LANGUAGES: LangKeyType[] = ["rus", "en"]
export const LANGUAGES_DESCRIPTION: LangValueType[] = ["(rus) Русский", "(en) English"]


export const ROUTE_FILTER = 'routeFilter'
export const DEFAULT_ROUTE_FILTER: RouteFilterType = "byDays"
export const TRAVEL_TYPE = 'travelType'
export const EXPENSE_TYPE = 'expenseType'
