"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
var nanoid_1 = require("nanoid");
var partial_1 = require("./partial");
var ActionType_1 = require("../../../types/ActionType");
var StoreName_1 = require("../../../types/StoreName");
/**
 * представление совершенного действия
 *
 * Содержит информацию о:
 * -  времени, когда было совершено действие (__datetime__)
 * -  имени сущности, которую изменили (__entity__)
 * -  кем совершено изменение (__user_id__)
 *
 * synced - флаг, сигнализирует о том, что action доставлен
 *
 * содержит поля:
 *
 * __id__,
 * __action__,
 * __data__,
 * __datetime__,
 * __entity__,
 * __synced__,
 * __user_id__,
 */
var Action = /** @class */ (function () {
    function Action(action) {
        this.user_id = '';
        if (!action)
            action = {};
        this.id = action.id !== undefined ? action.id : (0, nanoid_1.nanoid)(16);
        this.uid = action.uid !== undefined ? action.uid : this.id;
        this.action = action.action !== undefined ? action.action : ActionType_1.ActionType.ADD;
        this.datetime = action.datetime !== undefined ? new Date(action.datetime) : new Date();
        this.entity = action.entity !== undefined ? action.entity : StoreName_1.StoreName.UNINITIALIZED;
        this.synced = action.synced !== undefined ? action.synced : 0;
        this.user_id = action.user_id !== undefined ? action.user_id : '';
        switch (this.entity) {
            case StoreName_1.StoreName.TRAVEL:
                this.data = new partial_1.PartialTravel(action.data);
                break;
            case StoreName_1.StoreName.EXPENSES_ACTUAL:
            case StoreName_1.StoreName.EXPENSES_PLAN:
                this.data = new partial_1.PartialExpense(action.data);
                break;
            case StoreName_1.StoreName.HOTELS:
                this.data = new partial_1.PartialHotel(action.data || {});
                break;
            case StoreName_1.StoreName.PLACE:
                this.data = new partial_1.PartialPlace(action.data || {});
                break;
            case StoreName_1.StoreName.USERS:
                this.data = new partial_1.PartialUser(action.data || {});
                break;
            case StoreName_1.StoreName.MESSAGE:
                this.data = new partial_1.PartialMessage(action.data || {});
                break;
            default:
                this.data = action.data !== undefined ? action.data : {};
        }
    }
    Action.getAction = function (data, user_id, entity, actionType) {
        var action = new Action();
        if (data)
            action.data = data;
        if (user_id)
            action.user_id = user_id;
        if (entity)
            action.entity = entity;
        if (actionType)
            action.action = actionType;
        return action;
    };
    return Action;
}());
exports.Action = Action;
