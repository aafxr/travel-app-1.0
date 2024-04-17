import {PartialMember} from "./PartialMember";

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
 * @class PartialUser
 * @extends PartialMember
 */
export class PartialUser extends PartialMember {}