"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialUser = void 0;
var PartialMember_1 = require("./PartialMember");
/**
 * представление пользователя приложения
 * дополняет класс Member полями:
 * - token
 * - refresh_token
 * - settings текущие выбранные настройки / фильтры пользователя
 *
 * Содержит поля:
 *
 * __id__,
 * __username__,
 * __first_name__,
 * __last_name__,
 * __photo__,
 * __token__,
 * __refresh_token__,
 * __movementType__,
 * __age__,
 * __settings__
 *
 *
 * @class PartialUser
 * @extends PartialMember
 */
var PartialUser = /** @class */ (function (_super) {
    __extends(PartialUser, _super);
    function PartialUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PartialUser;
}(PartialMember_1.PartialMember));
exports.PartialUser = PartialUser;
