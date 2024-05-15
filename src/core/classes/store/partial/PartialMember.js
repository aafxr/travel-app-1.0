"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialMember = void 0;
/**
 * представление пользователя приложения
 *
 * Содержит поля:
 *
 * __id__,
 * __username__,
 * __first_name__,
 * __last_name__,
 * __photo__,
 * __movementType__,
 * __age__,
 */
var PartialMember = /** @class */ (function () {
    function PartialMember(member) {
        if (member.id)
            this.id = member.id;
        if (member.username)
            this.username = member.username;
        if (member.first_name)
            this.first_name = member.first_name;
        if (member.last_name)
            this.last_name = member.last_name;
        if (member.photo)
            this.photo = member.photo;
        if (member.age)
            this.age = member.age;
    }
    return PartialMember;
}());
exports.PartialMember = PartialMember;
