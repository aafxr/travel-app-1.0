import {nanoid} from "nanoid";
import {ExpenseVariantType} from "../../../types/ExpenseVariantType";
import {DBFlagType} from "../../../types/DBFlagType";
import {StoreName} from "../../../types/StoreName";
import {ExpenseDTO} from "../dto";
import {CurrencyType} from "../../../types/CurrencyType";
import {DEFAULT_CURRENCY} from "../../../constants";
import {Context} from "../Context";

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
export class Expense {

    id: string;
    entity_id: string;
    entity_type: string;
    primary_entity_id: string;
    primary_entity_type: string;
    section_id: string;
    title: string;
    user_id: string;
    currency: CurrencyType['char_code'];
    created_at: Date;
    datetime: Date;
    personal: DBFlagType;
    value: number;
    variant: ExpenseVariantType;
    deleted: boolean

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
        this.currency           = expense.currency !== undefined ? expense.currency : DEFAULT_CURRENCY
        this.personal           = expense.personal !== undefined ? expense.personal : 0
        this.value              = expense.value !== undefined ? expense.value : 0
        this.datetime           = expense.datetime !== undefined ? new Date(expense.datetime) : new Date(0)
        this.created_at         = expense.created_at !== undefined ? new Date(expense.created_at) : new Date()


        if('variant' in  expense && expense.variant) this.variant = expense.variant
        else this.variant = StoreName.EXPENSES_ACTUAL

        if('deleted' in expense && expense.deleted !== undefined) this.deleted = expense.deleted
        else this.deleted = false
    }


    static getPartial(expense: Partial<Expense> | Partial<ExpenseDTO> = {}) {
        const res: Partial<Expense> = {}
        if(expense.id !==undefined) res.id = expense.id
        if(expense.entity_id !==undefined) res.entity_id = expense.entity_id
        if(expense.entity_type !==undefined) res.entity_type = expense.entity_type
        if(expense.primary_entity_id !==undefined) res.primary_entity_id = expense.primary_entity_id
        if(expense.primary_entity_type !==undefined) res.primary_entity_type = expense.primary_entity_type
        if(expense.section_id !==undefined) res.section_id = expense.section_id
        if(expense.title !==undefined) res.title = expense.title
        if(expense.user_id !==undefined) res.user_id = expense.user_id
        if(expense.currency !==undefined) res.currency = expense.currency
        if(expense.personal !==undefined) res.personal = expense.personal
        if(expense.value !==undefined) res.value = expense.value
        if(expense.datetime !==undefined) res.datetime = new Date(expense.datetime)
        if(expense.created_at !==undefined) res.created_at = new Date(expense.created_at)

        return res
    }

    static createPersonalID(userID: string){
        return `${userID}:${nanoid(7)}`
    }

    static isPersonal(expense:Expense, userID: string){
        return expense.personal && expense.id.startsWith(userID)
    }

    static isCommon(expense: Expense){
        return expense.personal === 0 && expense.id.split(':').length === 1
    }

    static commonId(id: string){
        return id.split(':').pop() || id
    }

    static personalID(ctx: Context, id: string){
        const {user} = ctx
        if(!user){
            console.error('user undefined', ctx)
            return id
        }
        return `${user.id}:${id}`
    }
}
