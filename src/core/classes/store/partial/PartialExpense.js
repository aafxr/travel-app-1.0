"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialExpense = void 0;
/**
 * данный класс позволяет работать с расходами
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
var PartialExpense = /** @class */ (function () {
    function PartialExpense(expense) {
        if (!expense)
            expense = {};
        if (expense.id !== undefined)
            this.id = expense.id;
        if (expense.entity_id !== undefined)
            this.entity_id = expense.entity_id;
        if (expense.entity_type !== undefined)
            this.entity_type = expense.entity_type;
        if (expense.primary_entity_id !== undefined)
            this.primary_entity_id = expense.primary_entity_id;
        if (expense.primary_entity_type !== undefined)
            this.primary_entity_type = expense.primary_entity_type;
        if (expense.section_id !== undefined)
            this.section_id = expense.section_id;
        if (expense.title !== undefined)
            this.title = expense.title;
        if (expense.user_id !== undefined)
            this.user_id = expense.user_id;
        if (expense.currency !== undefined)
            this.currency = expense.currency;
        if (expense.personal !== undefined)
            this.personal = expense.personal;
        if (expense.value !== undefined)
            this.value = expense.value;
        if (expense.datetime !== undefined)
            this.datetime = new Date(expense.datetime);
        if (expense.created_at !== undefined)
            this.created_at = new Date(expense.created_at);
    }
    return PartialExpense;
}());
exports.PartialExpense = PartialExpense;
