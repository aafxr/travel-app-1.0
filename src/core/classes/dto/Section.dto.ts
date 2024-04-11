import {Section} from "../store/Section";
import {DBFlagType} from "../../../types/DBFlagType";

export class SectionDto implements Partial<Section>{
    id?: string;
    color?: string;
    title?: string;
    hidden?: DBFlagType;

    constructor(section: Partial<Section>) {
        if(section.id !== undefined) this.id = section.id
        if(section.color !== undefined) this.color = section.color
        if(section.title !== undefined) this.title = section.title
        if(section.hidden !== undefined) this.hidden = section.hidden
    }
}