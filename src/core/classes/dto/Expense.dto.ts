import {Expense} from '../store'
import {DBFlagType} from "../../../types/DBFlagType";
import {CurrencyType} from "../../../types/CurrencyType";


export class ExpenseDTO implements Omit<Partial<Expense>, 'datetime' | 'created_at'>{
    id?: string;
    title?: string;
    value?: number;
    user_id?: string;
    currency?: CurrencyType["char_code"];
    entity_id?: string;
    entity_type?: string;
    personal?: DBFlagType;
    primary_entity_id?: string;
    primary_entity_type?: string;
    section_id?: string;

    created_at?: string;
    datetime?: string;

    constructor(expense: Partial<Expense>) {
        if(expense.created_at !== undefined) this.created_at = expense.created_at.toISOString()
        if(expense.datetime !== undefined) this.datetime = expense.datetime.toISOString()

        if(expense.currency !== undefined) this.currency = expense.currency
        if(expense.entity_id !== undefined) this.entity_id = expense.entity_id
        if(expense.entity_type !== undefined) this.entity_type = expense.entity_type
        if(expense.id !== undefined) this.id = expense.id
        if(expense.personal !== undefined) this.personal = expense.personal
        if(expense.primary_entity_id !== undefined) this.primary_entity_id = expense.primary_entity_id
        if(expense.primary_entity_type !== undefined) this.primary_entity_type = expense.primary_entity_type
        if(expense.section_id !== undefined) this.section_id = expense.section_id
        if(expense.title !== undefined) this.title = expense.title
        if(expense.user_id !== undefined) this.user_id = expense.user_id
        if(expense.value !== undefined) this.value = expense.value
    }

}