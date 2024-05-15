"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
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
var Member = /** @class */ (function () {
    function Member(member) {
        this.id = member.id ? member.id : '';
        this.username = member.username ? member.username : '';
        this.first_name = member.first_name ? member.first_name : '';
        this.last_name = member.last_name ? member.last_name : '';
        this.photo = member.photo ? member.photo : '';
        this.age = member.age ? member.age : 18;
    }
    return Member;
}());
exports.Member = Member;
