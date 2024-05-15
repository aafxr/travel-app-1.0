"use strict";
/**
 * @category Types
 * @name MovementType
 * @typedef {object} MovementType
 * @property {string} id
 * @property {string} title
 * @property {JSX.Element} [icon]
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementType = void 0;
var MovementType;
(function (MovementType) {
    MovementType[MovementType["WALK"] = 0] = "WALK";
    MovementType[MovementType["CAR"] = 1] = "CAR";
    MovementType[MovementType["PUBLIC_TRANSPORT"] = 2] = "PUBLIC_TRANSPORT";
    MovementType[MovementType["FLIGHT"] = 3] = "FLIGHT";
    MovementType[MovementType["TAXI"] = 4] = "TAXI";
})(MovementType || (exports.MovementType = MovementType = {}));
