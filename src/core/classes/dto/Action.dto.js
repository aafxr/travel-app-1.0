"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDto = void 0;
var StoreName_1 = require("../../../types/StoreName");
var Travel_dto_1 = require("./Travel.dto");
var Limit_dto_1 = require("./Limit.dto");
var Expense_dto_1 = require("./Expense.dto");
var Place_dto_1 = require("./Place.dto");
var Hotel_dto_1 = require("./Hotel.dto");
var ActionDto = /** @class */ (function () {
    function ActionDto(action) {
        var _this = this;
        this.id = action.id;
        this.uid = action.uid;
        this.user_id = action.user_id;
        this.action = action.action;
        this.entity = action.entity;
        this.synced = action.synced;
        this.datetime = action.datetime.getTime();
        this.data = {};
        switch (action.entity) {
            case StoreName_1.StoreName.TRAVEL:
                Object.entries(new Travel_dto_1.TravelDTO(action.data))
                    .forEach(function (_a) {
                    var key = _a[0], val = _a[1];
                    return val !== undefined && (_this.data[key] = val);
                });
                break;
            case StoreName_1.StoreName.LIMIT:
                Object.entries(new Limit_dto_1.LimitDTO(action.data))
                    .forEach(function (_a) {
                    var key = _a[0], val = _a[1];
                    return val !== undefined && (_this.data[key] = val);
                });
                break;
            case 'expenses_actual':
            case 'expenses_plan':
                Object.entries(new Expense_dto_1.ExpenseDTO(action.data))
                    .forEach(function (_a) {
                    var key = _a[0], val = _a[1];
                    return val !== undefined && (_this.data[key] = val);
                });
                break;
            case StoreName_1.StoreName.PLACE:
                Object.entries(new Place_dto_1.PlaceDto(action.data))
                    .forEach(function (_a) {
                    var key = _a[0], val = _a[1];
                    return val !== undefined && (_this.data[key] = val);
                });
                break;
            case StoreName_1.StoreName.HOTELS:
                Object.entries(new Hotel_dto_1.HotelDto(action.data))
                    .forEach(function (_a) {
                    var key = _a[0], val = _a[1];
                    return val !== undefined && (_this.data[key] = val);
                });
                break;
            default:
                this.data = action.data;
        }
    }
    return ActionDto;
}());
exports.ActionDto = ActionDto;
