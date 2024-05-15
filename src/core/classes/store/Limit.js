"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Limit = void 0;
var nanoid_1 = require("nanoid");
/**
 * Класс для работы с лимитами
 *
 * id лимита формируется как:
 * - "section_id:primary_entity_id" для общих лимитов
 * - "user_id:section_id:primary_entity_id" для общих личных
 *
 * Содержи поля:
 *
 * __id__,
 * __personal__,
 * __section_id__,
 * __value__,
 * __primary_entity_id__
 */
var Limit = /** @class */ (function () {
    function Limit(limit) {
        if (!limit)
            limit = {};
        this.id = limit.id !== undefined ? limit.id : (0, nanoid_1.nanoid)(7);
        this.personal = limit.personal !== undefined ? limit.personal : 0;
        this.section_id = limit.section_id !== undefined ? limit.section_id : '';
        this.value = limit.value !== undefined ? limit.value : 0;
        this.primary_entity_id = limit.primary_entity_id !== undefined ? limit.primary_entity_id : '';
    }
    Limit.getCommonLimitID = function (section_id, primary_entity_id) {
        return "".concat(section_id, ":").concat(primary_entity_id);
    };
    Limit.getPersonalLimitID = function (user_id, section_id, primary_entity_id) {
        return "".concat(user_id, ":").concat(section_id, ":").concat(primary_entity_id);
    };
    return Limit;
}());
exports.Limit = Limit;
