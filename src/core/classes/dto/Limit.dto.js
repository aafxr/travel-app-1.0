"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitDTO = void 0;
var LimitDTO = /** @class */ (function () {
    function LimitDTO(limit) {
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
    return LimitDTO;
}());
exports.LimitDTO = LimitDTO;
