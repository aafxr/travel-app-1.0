import {DBFlagType} from "../../../types/DBFlagType";
import {ExpenseVariantType} from "../../../types/ExpenseVariantType";
import {nanoid} from "nanoid";
import {ExpenseDTO} from "../dto/Expense.dto";
import {StoreName} from "../../../types/StoreName";

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
export class Expense {

    id: string;
    entity_id: string;
    entity_type: string;
    primary_entity_id: string;
    primary_entity_type: string;
    section_id: string;
    title: string;
    user_id: string;
    currency: string;
    created_at: Date;
    datetime: Date;
    personal: DBFlagType;
    value: number;
    variant: ExpenseVariantType;

    constructor(expense?: Partial<Expense> | Partial<ExpenseDTO>) {
        if(!expense) expense = {}

        this.id                 = expense.id !== undefined ? expense.id : nanoid(7)
        this.entity_id          = expense.entity_id !== undefined ? expense.entity_id : ''
        this.entity_type        = expense.entity_type !== undefined ? expense.entity_type : ''
        this.primary_entity_id  = expense.primary_entity_id !== undefined ? expense.primary_entity_id : ''
        this.primary_entity_type = expense.primary_entity_type !== undefined ? expense.primary_entity_type : ''
        this.section_id         = expense.section_id !== undefined ? expense.section_id : ''
        this.title              = expense.title !== undefined ? expense.title : ''
        this.user_id            = expense.user_id !== undefined ? expense.user_id : ''
        this.currency           = expense.currency !== undefined ? expense.currency : ''
        this.personal           = expense.personal !== undefined ? expense.personal : 0
        this.value              = expense.value !== undefined ? expense.value : 0
        this.datetime           = expense.datetime !== undefined ? new Date(expense.datetime) : new Date(0)
        this.created_at         = expense.created_at !== undefined ? new Date(expense.created_at) : new Date()

        if('variant' in  expense && expense.variant) this.variant = expense.variant
        else this.variant = StoreName.EXPENSES_ACTUAL
    }
}
