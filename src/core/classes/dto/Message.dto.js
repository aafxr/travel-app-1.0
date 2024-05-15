"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDto = void 0;
var MessageDto = /** @class */ (function () {
    function MessageDto(message) {
        if (message.id !== undefined)
            this.id = message.id;
        if (message.text !== undefined)
            this.text = message.text;
        if (message.date !== undefined)
            this.date = message.date.toISOString();
        if (message.from !== undefined)
            this.from = message.from;
        if (message.primary_entity_id !== undefined)
            this.primary_entity_id = message.primary_entity_id;
    }
    return MessageDto;
}());
exports.MessageDto = MessageDto;
