import {Limit} from "../Limit";
import {LimitDTO} from "../../dto";
import {DBFlagType} from "../../../../types/DBFlagType";


/**
 * Класс для работы с лимитами
 *
 * id лимита формируется как:
 * - "section_id:primary_entity_id" для общих лимитов
 * - "user_id:section_id:primary_entity_id" для общих личных
 *
 * Содержи поля:
 *
 * __id__,
 * __personal__,
 * __section_id__,
 * __value__,
 * __primary_entity_id__
 */
export class PartialLimit implements Partial<Limit>{

    id?: string
    personal?: DBFlagType
    section_id?: string
    value?: number
    primary_entity_id?: string;

    constructor(limit?: Partial<Limit> | LimitDTO) {
        if(!limit) limit = {}

        if(limit.id !== undefined) this.id = limit.id
        if(limit.personal !== undefined) this.personal = limit.personal
        if(limit.section_id !== undefined) this.section_id = limit.section_id
        if(limit.value !== undefined) this.value = limit.value
        if(limit.primary_entity_id !== undefined) this.primary_entity_id = limit.primary_entity_id
    }
}