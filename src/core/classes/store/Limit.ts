import {DBFlagType} from "../../../types/DBFlagType";
import {nanoid} from "nanoid";
import {LimitDTO} from "../dto/Limit.dto";


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
export class Limit {

    id: string
    personal: DBFlagType
    section_id: string
    value: number
    primary_entity_id: string;

    constructor(limit?: Partial<Limit> | LimitDTO) {
        if(!limit) limit = {}

        this.id                 = limit.id !== undefined ? limit.id : nanoid(7)
        this.personal           = limit.personal !== undefined ? limit.personal : 0
        this.section_id         = limit.section_id !== undefined ? limit.section_id : ''
        this.value              = limit.value !== undefined ? limit.value : 0
        this.primary_entity_id  = limit.primary_entity_id !== undefined ? limit.primary_entity_id : ''
    }


    static getCommonLimitID(section_id: string, primary_entity_id: string){
        return `${section_id}:${primary_entity_id}`
    }

    static getPersonalLimitID(user_id: string, section_id: string, primary_entity_id: string){
        return `${user_id}:${section_id}:${primary_entity_id}`
    }
}