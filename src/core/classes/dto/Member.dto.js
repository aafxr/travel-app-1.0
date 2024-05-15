"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberDto = void 0;
var MemberDto = /** @class */ (function () {
    function MemberDto(member) {
        if (member.id)
            this.id = member.id;
        if (member.age)
            this.age = member.age;
        if (member.first_name)
            this.first_name = member.first_name;
        if (member.last_name)
            this.last_name = member.last_name;
        if (member.username)
            this.username = member.username;
        if (member.photo)
            this.photo = member.photo;
    }
    return MemberDto;
}());
exports.MemberDto = MemberDto;
