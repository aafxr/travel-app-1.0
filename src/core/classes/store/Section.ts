import {DBFlagType} from "../../../types/DBFlagType";

/**
 * класс для работы с сущностью Section
 *
 * Содержит поля:
 *
 * __id__
 * __color__
 * __title__
 * __hidden__
 *
 */
export class Section{

    id: string;
    color: string;
    title: string;
    hidden: DBFlagType;

    constructor(section?: Partial<Section>) {
        if(!section) section = {}

        this.id     = section.id !== undefined ? section.id : ''
        this.color  = section.color !== undefined ? section.color : ''
        this.title  = section.title !== undefined ? section.title : ''
        this.hidden = section.hidden !== undefined ? section.hidden : 0
    }
}