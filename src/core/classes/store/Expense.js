"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense = void 0;
var nanoid_1 = require("nanoid");
var StoreName_1 = require("../../../types/StoreName");
/**
 * данный класс позволяет работать с расходами
 *
 * ---
 *
 * ##### id для персональных расходов должно быть вида user_id:random_id
 *
 * ---
 *
 * Содержит поля:
 *
 * __id__,
 * __entity_id__,
 * __entity_type__,
 * __primary_entity_id__,
 * __primary_entity_type__,
 * __section_id__,
 * __title__,
 * __user_id__,
 * __currency__,
 * __created_at__,
 * __datetime__,
 * __personal__,
 * __value__,
 * __variant__
 */
var Expense = /** @class */ (function () {
    function Expense(expense) {
        if (!expense)
            expense = {};
        this.id = expense.id !== undefined ? expense.id : (0, nanoid_1.nanoid)(7);
        this.entity_id = expense.entity_id !== undefined ? expense.entity_id : '';
        this.entity_type = expense.entity_type !== undefined ? expense.entity_type : '';
        this.primary_entity_id = expense.primary_entity_id !== undefined ? expense.primary_entity_id : '';
        this.primary_entity_type = expense.primary_entity_type !== undefined ? expense.primary_entity_type : '';
        this.section_id = expense.section_id !== undefined ? expense.section_id : '';
        this.title = expense.title !== undefined ? expense.title : '';
        this.user_id = expense.user_id !== undefined ? expense.user_id : '';
        this.currency = expense.currency !== undefined ? expense.currency : '';
        this.personal = expense.personal !== undefined ? expense.personal : 0;
        this.value = expense.value !== undefined ? expense.value : 0;
        this.datetime = expense.datetime !== undefined ? new Date(expense.datetime) : new Date(0);
        this.created_at = expense.created_at !== undefined ? new Date(expense.created_at) : new Date();
        if ('variant' in expense && expense.variant)
            this.variant = expense.variant;
        else
            this.variant = StoreName_1.StoreName.EXPENSES_ACTUAL;
        if ('deleted' in expense && expense.deleted !== undefined)
            this.deleted = expense.deleted;
        else
            this.deleted = false;
    }
    Expense.createPersonalID = function (userID) {
        return "".concat(userID, ":").concat((0, nanoid_1.nanoid)(7));
    };
    Expense.isPersonal = function (expense, userID) {
        return expense.personal && expense.id.startsWith(userID);
    };
    Expense.isCommon = function (expense) {
        return expense.personal === 0 && expense.id.split(':').length === 1;
    };
    return Expense;
}());
exports.Expense = Expense;
