import {Member} from "./Member";
import {UserSettingsType} from "../../../types/UserSettingsType";
import {UserDto} from "../dto";
import {DEFAULT_CURRENCY, LANGUAGES, LANGUAGES_DESCRIPTION} from "../../../constants";
import {LangKeyType, LangValueType} from "../../../contexts/LangContextProvider/LangType";

/**
 * представление пользователя приложения
 * дополняет класс Member полями:
 * - token
 * - refresh_token
 * - settings текущие выбранные настройки / фильтры пользователя
 *
 * Содержит поля:
 *
 * __id__,
 * __username__,
 * __first_name__,
 * __last_name__,
 * __photo__,
 * __token__,
 * __refresh_token__,
 * __movementType__,
 * __age__,
 * __settings__
 *
 *
 * @class User
 * @extends Member
 */
export class User extends Member {
    static DEFAULT_SETTINGS: UserSettingsType = {
        curtain: 0,
        routeFilter: "byDays",
        expensesFilter: "all",
        day: 1,
        currency: DEFAULT_CURRENCY,
        lang: "rus"
    };

    token: string;
    refresh_token: string;


    settings: UserSettingsType;

    constructor(user: Partial<User> | UserDto) {
        super(user);

        this.token = ''
        this.refresh_token = ''
        this.settings = {...User.DEFAULT_SETTINGS}

        if('token' in user && user.token !== undefined) this.token =  user.token
        if('refresh_token' in user && user.refresh_token !== undefined) this.refresh_token = user.refresh_token
        if('settings' in user) Object.assign(this.settings, user.settings)
    }


    static getPartial(user: Partial<User> | UserDto = {}){
        let res: Partial<User> = {}
        res = Member.getPartial(user)
        if('settings' in user) {
            res.settings = {} as UserSettingsType
            Object.assign(res.settings, user.settings)
        }
        return res
    }


    static getLanguageDescription(key: LangKeyType = "rus"): LangValueType{
        const idx = LANGUAGES.findIndex(l => l === key)
        if(idx !== -1) {
            return LANGUAGES_DESCRIPTION[idx]
        }
        return "(rus) Русский"
    }


    static getLangugeKey(descr: LangValueType = "(rus) Русский"): LangKeyType{
        const idx = LANGUAGES_DESCRIPTION.findIndex(l => l === descr)
        if(idx !== -1) {
            return LANGUAGES[idx]
        }
        return "rus"
    }
}