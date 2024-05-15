"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialMessage = void 0;
var PartialMessage = /** @class */ (function () {
    function PartialMessage(msg) {
        if (msg.id !== undefined)
            this.id = msg.id;
        if (msg.date !== undefined)
            this.date = new Date(msg.date);
        if (msg.from !== undefined)
            this.from = msg.from;
        if (msg.text !== undefined)
            this.text = msg.text;
        if (msg.primary_entity_id !== undefined)
            this.primary_entity_id = msg.primary_entity_id;
    }
    return PartialMessage;
}());
exports.PartialMessage = PartialMessage;
