"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseDTO = void 0;
var ExpenseDTO = /** @class */ (function () {
    function ExpenseDTO(expense) {
        if (expense.created_at !== undefined)
            this.created_at = expense.created_at.toISOString();
        if (expense.datetime !== undefined)
            this.datetime = expense.datetime.toISOString();
        if (expense.currency !== undefined)
            this.currency = expense.currency;
        if (expense.entity_id !== undefined)
            this.entity_id = expense.entity_id;
        if (expense.entity_type !== undefined)
            this.entity_type = expense.entity_type;
        if (expense.id !== undefined)
            this.id = expense.id;
        if (expense.personal !== undefined)
            this.personal = expense.personal;
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
        if (expense.value !== undefined)
            this.value = expense.value;
    }
    return ExpenseDTO;
}());
exports.ExpenseDTO = ExpenseDTO;
