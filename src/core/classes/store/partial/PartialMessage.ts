import {MessageDto} from "../../dto";
import {Message} from "../Message";

export class PartialMessage implements Partial<Message>{
    id?: string
    date?: Date
    from?: string
    text?: string
    primary_entity_id?: string

    constructor(msg: Partial<Message> | MessageDto) {
        if(msg.id !== undefined) this.id = msg.id
        if(msg.date !== undefined) this.date = new Date(msg.date)
        if(msg.from !== undefined) this.from = msg.from
        if(msg.text !== undefined) this.text = msg.text
        if(msg.primary_entity_id !== undefined) this.primary_entity_id = msg.primary_entity_id
    }
}