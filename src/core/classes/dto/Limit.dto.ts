import {Limit} from "../store/Limit";
import {DBFlagType} from "../../../types/DBFlagType";
import {CurrencyType} from "../../../types/CurrencyType";

interface ILimitDTO extends Partial<Limit>{}

export class LimitDTO implements ILimitDTO{
    id?: string;
    personal?: DBFlagType;
    primary_entity_id?: string;
    section_id?: string;
    value?: number;
    currency?: CurrencyType['char_code'];

    constructor(limit: Partial<Limit>) {
        if(limit.id !== undefined) this.id = limit.id
        if(limit.personal !== undefined) this.personal = limit.personal
        if(limit.section_id !== undefined) this.section_id = limit.section_id
        if(limit.value !== undefined) this.value = limit.value
        if(limit.primary_entity_id !== undefined) this.primary_entity_id = limit.primary_entity_id
        if(limit.currency !== undefined) this.currency = limit.currency
    }

}