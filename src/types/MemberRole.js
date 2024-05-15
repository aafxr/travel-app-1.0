"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRole = void 0;
var MemberRole;
(function (MemberRole) {
    MemberRole[MemberRole["OWNER"] = 0] = "OWNER";
    MemberRole[MemberRole["ADMIN"] = 1] = "ADMIN";
    MemberRole[MemberRole["EDITOR"] = 2] = "EDITOR";
    MemberRole[MemberRole["COMMENTATOR"] = 3] = "COMMENTATOR";
    MemberRole[MemberRole["WATCHER"] = 4] = "WATCHER";
})(MemberRole || (exports.MemberRole = MemberRole = {}));
