import {Message} from "../store";

export class MessageDto implements Omit<Partial<Message>, 'date'>{
    id?: string;
    text?: string;
    date?: string;
    from?: string;
    primary_entity_id?: string;


    constructor(message: Partial<Message>) {
        if(message.id !== undefined) this.id = message.id
        if(message.text !== undefined) this.text = message.text
        if(message.date !== undefined) this.date = message.date.toISOString()
        if(message.from !== undefined) this.from = message.from
        if(message.primary_entity_id !== undefined) this.primary_entity_id = message.primary_entity_id
    }

}