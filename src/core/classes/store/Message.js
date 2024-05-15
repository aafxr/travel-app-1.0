"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var nanoid_1 = require("nanoid");
var Message = /** @class */ (function () {
    function Message(msg) {
        this.id = msg.id ? msg.id : (0, nanoid_1.nanoid)(16);
        this.date = msg.date ? new Date(msg.date) : new Date();
        this.from = msg.from ? msg.from : 'anonym';
        this.text = msg.text ? msg.text : '';
        this.primary_entity_id = msg.primary_entity_id ? msg.primary_entity_id : 'unknown';
    }
    Message.isSelf = function (msg, user) {
        return msg.from === (user === null || user === void 0 ? void 0 : user.id);
    };
    return Message;
}());
exports.Message = Message;
