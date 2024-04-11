import {Member} from "./Member";
import {UserSettingsType} from "../../../types/UserSettingsType";

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

    token: string;
    refresh_token: string;


    settings: UserSettingsType = {
        curtain: 0,
        routeFilter: "byDays",
        expensesFilter: "all",
        day: 1
    };

    constructor(user: Partial<User>) {
        super(user);

        this.token = user.token ? user.token : ''
        this.refresh_token = user.refresh_token ? user.refresh_token : ''
    }

}