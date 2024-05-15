"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialLimit = void 0;
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
var PartialLimit = /** @class */ (function () {
    function PartialLimit(limit) {
        if (!limit)
            limit = {};
        if (limit.id !== undefined)
            this.id = limit.id;
        if (limit.personal !== undefined)
            this.personal = limit.personal;
        if (limit.section_id !== undefined)
            this.section_id = limit.section_id;
        if (limit.value !== undefined)
            this.value = limit.value;
        if (limit.primary_entity_id !== undefined)
            this.primary_entity_id = limit.primary_entity_id;
    }
    return PartialLimit;
}());
exports.PartialLimit = PartialLimit;
